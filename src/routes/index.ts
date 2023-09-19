import { getVideos, getVideoById } from '../middlewares/video';
import { uploadVideo } from '../middlewares/upload';
import { Router } from 'express';

const router = Router();

router.get('/videos', getVideos);

router.get('/:id', getVideoById);

router.post('/upload', uploadVideo);

export { router };