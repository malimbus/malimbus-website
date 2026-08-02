import express from 'express';

import { getProfiles, getProfilesByUser, getProfilesBySearch, createProfile, getProfile, updateProfile, deleteProfile } from '../controllers/profile.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', getProfiles);
router.get('/user', getProfilesByUser);
router.get('/search', getProfilesBySearch);
router.post('/', auth, createProfile);
router.get('/:id', getProfile);
router.patch('/:id', auth, updateProfile);
router.delete('/:id', auth, deleteProfile);


export default router;