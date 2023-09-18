import videosMiddleware from '../middlewares/video.js';
import { uploadVideo } from '../middlewares/upload.js';
import express from 'express';

const router = express.Router();

router.get('/videos', videosMiddleware.getVideos);

router.get('/videos/:id', videosMiddleware.getVideoById);

router.post('/upload', uploadVideo);

export default router;