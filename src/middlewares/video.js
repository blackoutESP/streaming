"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoById = exports.getVideos = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var getVideos = function (request, response, next) {
    fs_1.default.readdir(path_1.default.join(__dirname, '../assets'), { encoding: 'utf-8' }, function (error, files) {
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
var getVideoById = function (request, response, next) {
    var id = request.params.id;
    var assets = path_1.default.join(__dirname, '../assets');
    var filePath = path_1.default.join(assets, id);
    var size = fs_1.default.statSync(filePath).size;
    var ext = path_1.default.extname(filePath);
    var range = request.headers.range;
    if (range) {
        var bytes = range.replace(/bytes=/, '').split('-');
        var start = parseInt(bytes[0], 10);
        var end = bytes[1] ? parseInt(bytes[1], 10) : size - 1;
        var chunkSize = (end - start) + 1;
        var headers = {
            'Accept-Ranges': 'bytes',
            'Content-Range': "bytes ".concat(start, "-").concat(end, "/").concat(size),
            'Content-Type': "video/".concat(ext),
            'Content-Length': chunkSize
        };
        var stream = fs_1.default.createReadStream(filePath, { start: start, end: end });
        response.writeHead(206, headers);
        stream.pipe(response);
    }
    else {
        // first time video is requested this will be executed
        var headers = {
            'Content-Type': "video/".concat(ext),
            'Content-Length': size
        };
        response.writeHead(200, headers);
        var stream = fs_1.default.createReadStream(filePath);
        stream.pipe(response);
    }
};
exports.getVideoById = getVideoById;
