// Copyright: Panshak Solomon
// A.P. Leventis Ornithological Research Institute.
// University of Jos Biological Conservatory
// All rights reserved
// ©2021 and beyond

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
import profileRoutes from './routes/profile.js';
import contactRoutes from './routes/contact.js';

// Load environment variables before reading process.env
dotenv.config();

const {
  DB_URL,
  PORT = 5000,
  IMAGEKIT_URL_ENDPOINT,
  IMAGEKIT_URL_PUBLIC_KEY,
  IMAGEKIT_URL_PRIVATE_KEY,
  FRONTEND_URL,
} = process.env;

if (!DB_URL) {
  throw new Error('DB_URL is missing from server/.env');
}

if (
  !IMAGEKIT_URL_ENDPOINT ||
  !IMAGEKIT_URL_PUBLIC_KEY ||
  !IMAGEKIT_URL_PRIVATE_KEY
) {
  throw new Error('One or more ImageKit environment variables are missing');
}

const imagekit = new ImageKit({
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  publicKey: IMAGEKIT_URL_PUBLIC_KEY,
  privateKey: IMAGEKIT_URL_PRIVATE_KEY,
});

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const allowedOrigins = [
  'http://localhost:3000',
  FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use('/posts', postRoutes);
app.use('/user', userRouter);
app.use('/profiles', profileRoutes);
app.use('/contact', contactRoutes);

app.get('/auth', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result);
});

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
});

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);