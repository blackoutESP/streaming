import { Request, Response, NextFunction } from 'express';
import * as fs from 'node:fs';
import * as path from 'node:path';

export const getVideos = (request: Request, response: Response, next: NextFunction) => {
    fs.readdir(path.join(__dirname, '../assets'), { encoding: 'utf-8' }, (error, files) => {
        if (error) {
            console.error(error);
            next(error);
        }
        if (files.length > 0) {
            return response.status(200).json({ ok: true, data: files, fails: [] });
        } else {
            return response.status(404).json({ ok: false, data: [], fails: [{ msg: 'No videos found.' }] });
        }
    });
}

export const getVideoById = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const assets = path.join(__dirname, '../assets');
    const filePath = path.join(assets, id);
    const size = fs.statSync(filePath).size;
    const ext = path.extname(filePath);
    const range = request.headers.range;
    if (range) {
        const bytes = range.replace(/bytes=/, '').split('-');
        const start = parseInt(bytes[0], 10);
        const end = bytes[1] ? parseInt(bytes[1], 10) : size - 1;
        const chunkSize = (end - start) + 1;
        const headers = {
            'Accept-Ranges': 'bytes',
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Content-Type': `video/${ext}`,
            'Content-Length': chunkSize
        };
        const stream = fs.createReadStream(filePath, { start, end });
        response.writeHead(206, headers);
        stream.pipe(response);
    } else {
        // first time video is requested this will be executed
        const headers = {
            'Content-Type': `video/${ext}`,
            'Content-Length': size
        };
        response.writeHead(200, headers);
        const stream = fs.createReadStream(filePath);
        stream.pipe(response);
    }
}