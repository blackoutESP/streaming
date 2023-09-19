"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoById = exports.getVideos = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getVideos = (request, response, next) => {
    fs_1.default.readdir(path_1.default.join(__dirname, '../assets'), { encoding: 'utf-8' }, (error, files) => {
        if (error) {
            console.error(error);
            next(error);
        }
        if (files.length > 0) {
            return response.status(200).json({ ok: true, data: files, fails: [] });
        }
        else {
            return response.status(404).json({ ok: false, data: [], fails: [{ msg: 'No videos found.' }] });
        }
    });
};
exports.getVideos = getVideos;
const getVideoById = (request, response, next) => {
    const id = request.params.id;
    console.log(id);
    const assets = path_1.default.join(__dirname, '../assets');
    const filePath = path_1.default.join(assets, id);
    const size = fs_1.default.statSync(filePath).size;
    const ext = path_1.default.extname(filePath);
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
        const stream = fs_1.default.createReadStream(filePath, { start, end });
        response.writeHead(206, headers);
        stream.pipe(response);
    }
    else {
        // first time video is requested this will be executed
        const headers = {
            'Content-Type': `video/${ext}`,
            'Content-Length': size
        };
        response.writeHead(200, headers);
        const stream = fs_1.default.createReadStream(filePath);
        stream.pipe(response);
    }
};
exports.getVideoById = getVideoById;
