import express from 'express'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from 'dotenv'
import UserModel from "../models/user.js";


dotenv.config()
const SECRET = process.env.SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist in our database" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role, isSubscriber: existingUser.isSubscriber }, SECRET, { expiresIn: "2h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, role, isSubscriber: false, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id, role: result.role, isSubscriber: result.isSubscriber }, SECRET, { expiresIn: "2h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};



export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email address is required",
    });
  }

  try {
    const user = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist in our database",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const smtpTransport = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.SEND_IN_BLUE_USER,
        pass: process.env.SEND_IN_BLUE_PASS,
      },
    });

    await smtpTransport.verify();
console.log("SMTP connection verified");

    const resetUrl = `${process.env.FRONTEND_URL}/reset/${token}`;

    await smtpTransport.sendMail({
      to: user.email,
      from: "Malimbus <malimbus01@gmail.com>",
      subject: "Password reset request",
      html: `
        <p>You requested a password reset for your Malimbus account.</p>

        <p>
          Please click
          <a href="${resetUrl}">
            this link
          </a>
          to reset your password.
        </p>

        <p>If the link is not clickable, copy and paste this URL into your browser:</p>

        <p>${resetUrl}</p>

        <p>This link will expire in one hour.</p>

        <p>If you did not request this password reset, ignore this email.</p>
      `,
    });

    return res.status(200).json({
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error("Password reset error:", error);

    return res.status(500).json({
      message: "Unable to send password reset email",
    });
  }
};


export const resetPassword = (req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  UserModel.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
}