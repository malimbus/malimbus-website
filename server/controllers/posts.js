import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import PostModel from '../models/postModel.js';
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();


// export const getPosts = async (req, res) => { 
//     try {
//         const allPosts = await PostModel.find().sort({ _id: -1 });
                
//         res.status(200).json(allPosts);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const getPosts = async (req, res) => {
    const { page } = req.query
    
    try {
        const LIMIT = 250;
        const startIndex = (Number(page)) * LIMIT; // get the starting index of every page
    
        const total = await PostModel.countDocuments({});
        const posts = await PostModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getNews = async (req, res) => {
    const { page } = req.query
    
    try {
        const LIMIT = 32;
        const startIndex = (Number(page)) * LIMIT; // get the starting index of every page
    
        const total = await PostModel.countDocuments({postType: 'news'});
        const posts = await PostModel.find({postType: 'news', isApproved: true}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPublications = async (req, res) => {
    const { page } = req.query
    
    try {
        const LIMIT = 150;
        const startIndex = (Number(page)) * LIMIT; // get the starting index of every page 
    
        const total = await PostModel.countDocuments({postType: 'publication'});
        const posts = await PostModel.find({postType: 'publication', isApproved: true}).sort({ year: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const getDocuments = async (req, res) => {
    const { page } = req.query
    
    try {
        const LIMIT = 20;
        const startIndex = (Number(page)) * LIMIT; // get the starting index of every page
    
        const total = await PostModel.countDocuments({postType: 'document'});
        const posts = await PostModel.find({postType: 'document', isApproved: true}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}



export const getPost = async (req, res) => { 
    const { slug } = req.params;

    try {
        const post = await PostModel.findOne({'slug': slug});
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    const d = new Date()
    const createdDate = d.setFullYear(post.year);
    
    const newPostMessage = new PostModel({ ...post, createdAt: post.postType === 'publication' ? createdDate : new Date().toISOString() })

    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
//     const smtpTransport = nodemailer.createTransport({
//     host: 'smtp-relay.sendinblue.com',
//     port : 587,
//     auth: {
//     user: process.env.SEND_IN_BLUE_USER,
//     pass: process.env.SEND_IN_BLUE_PASS
//     }
// })

    try {
        await newPostMessage.save()
        // .then(newPostMessage=>{
        //     smtpTransport.sendMail({
        //         from:  'MALIMBUS <no-reply@aplori.org>',
        //         to: 'ipanshak@gmail.com',
        //         // cc: 'ivande.sam@gmail.com',
        //         subject: `There is a new post by ${newPostMessage.author} `,
        //         text: `There is a new post by ${newPostMessage.author} `,
        //         html: `<body><p> Dear Moderator,</p> <p> ${newPostMessage.author} posted a ${newPostMessage.postType} titled: <strong>${newPostMessage.title}.</strong></p>
        //         <p>Please visit the MALIMBUS website to moderate the post </p></body>`
        //     })
        //     res.status(201).json(newPostMessage);
        // })

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getPostsByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        // const email = new RegExp(searchQuery, "i");

        const posts = await PostModel.find({ authors: searchQuery }).sort({ year: -1});
        

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        
        const title = new RegExp(searchQuery, "i");
        const year = new RegExp(searchQuery, "i");
        const region = searchQuery

        const posts = await PostModel.find({ $or: [ {title}, { year }, { region } ] }).sort({ year: -1});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const {  postType, author, userId, fileUrl, title, authors, content, year, page, volume, region, isPrivate, avatar, isApproved } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { postType, author, userId, fileUrl, title, authors, content, year, page, volume, region, isPrivate, avatar, isApproved, _id: id };

    await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostModel.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export default router;