import videosMiddleware from '../middlewares/video.js';
import { uploadVideo } from '../middlewares/upload.js';
import express from 'express';

const router = express.Router();

router.get('/', videosMiddleware.getVideos);

router.get('/:id', videosMiddleware.getVideoById);

router.post('/upload', uploadVideo);

export default router;