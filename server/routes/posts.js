import express from 'express';

import { getPosts, createPost, getPost, updatePost, deletePost, getPostsByUser, getPostsBySearch, getNews, getPublications, getDocuments } from '../controllers/posts.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getPosts);
router.get('/news', getNews);
router.get('/publications', getPublications);
router.get('/documents', getDocuments);
router.get('/user', getPostsByUser);
router.get('/search', getPostsBySearch);
router.get('/:slug', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;