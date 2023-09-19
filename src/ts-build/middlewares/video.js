"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoById = exports.getVideos = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const getVideos = (request, response, next) => {
    fs.readdir(path.join(__dirname, '../assets'), { encoding: 'utf-8' }, (error, files) => {
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
    }
    else {
        // first time video is requested this will be executed
        const headers = {
            'Content-Type': `video/${ext}`,
            'Content-Length': size
        };
        response.writeHead(200, headers);
        const stream = fs.createReadStream(filePath);
        stream.pipe(response);
    }
};
exports.getVideoById = getVideoById;
