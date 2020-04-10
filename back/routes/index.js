const express           = require('express');
const router            = express.Router();

const videosMiddleware  = require('../middlewares/video');
const uploadsMiddleware = require('../middlewares/upload');

router.get('/videos', videosMiddleware.getVideos);

router.get('/video/:id', videosMiddleware.getVideoById);

router.post('/upload', uploadsMiddleware.uploadVideo);

module.exports = router;