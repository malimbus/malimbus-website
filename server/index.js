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
  throw new Error('DB_URL is missing from the environment variables');
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
app.use(
  express.urlencoded({
    limit: '30mb',
    extended: true,
  })
);

// Frontend addresses that are permitted to call this backend
const allowedOrigins = [
  'http://localhost:3000',
  FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow requests without an Origin header, such as direct browser visits,
    // Postman, PowerShell and server-to-server requests.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(`CORS blocked origin: ${origin}`);

    return callback(
      new Error(`Origin not permitted by CORS: ${origin}`)
    );
  },
  credentials: true,
  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
};

// Apply CORS before all routes
app.use(cors(corsOptions));

// Handle browser preflight requests
app.options('*', cors(corsOptions));

app.use('/posts', postRoutes);
app.use('/user', userRouter);
app.use('/profiles', profileRoutes);
app.use('/contact', contactRoutes);

app.get('/auth', (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    return res.status(200).json(result);
  } catch (error) {
    console.error(
      'ImageKit authentication error:',
      error.message
    );

    return res.status(500).json({
      message: 'Unable to generate ImageKit authentication parameters',
    });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('SERVER IS RUNNING');
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Allowed frontend origins: ${allowedOrigins.join(', ')}`
      );
    });
  })
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error.message
    );

    process.exit(1);
  });