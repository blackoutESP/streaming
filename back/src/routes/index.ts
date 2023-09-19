import { getVideos, getVideoById } from '../middlewares/video.js';
import { uploadVideo } from '../middlewares/upload.js';
import { Router } from 'express';

const router = Router();

router.get('/', getVideos);

router.get('/:id', getVideoById);

router.post('/upload', uploadVideo);

export { router };