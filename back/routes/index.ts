import generateToken from '../middlewares/jwt';
import express from 'express';
import { getVideos, getVideoById } from '../middlewares/video';
import { authMiddleware } from '../middlewares/auth';
// import uploadsMiddleware from '../middlewares/video';
export const router            = express.Router();

router.get('/login', generateToken);

router.get('/videos', authMiddleware, getVideos);

router.get('/videos/:id', authMiddleware, getVideoById);

// router.post('/upload', authMiddleware, uploadsMiddleware.uploadVideo);

