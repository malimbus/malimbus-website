import express from 'express';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


export const contact = async (req, res) => {
    const {email, subject, message, firstName, lastName } = req.body;
    
    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
    const smtpTransport = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port : 587,
    auth: {
    user: process.env.SEND_IN_BLUE_USER,
    pass: process.env.SEND_IN_BLUE_PASS
    }
})

    try {
        
        smtpTransport.sendMail({
            from: `${firstName} ${lastName} <${email}>`,
            to: 'ipanshak@gmail.com',
            // cc: 'panshak@zoho.com',
            replyTo: email,
            subject: subject,
            text: message,
            html: `<body><p>${message}</p></body>`
        })
        res.status(201).json({message: "Message sent successfully"});
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
