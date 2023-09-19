"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var bunyan_1 = require("bunyan");
var path_1 = require("path");
var fs_1 = require("fs");
var accessLog = fs_1.default.createWriteStream(path_1.default.join(__dirname + './../logs/access.log'), { encoding: 'utf-8' });
var errorLog = fs_1.default.createWriteStream(path_1.default.join(__dirname + './../logs/error.log'), { encoding: 'utf-8' });
exports.logger = bunyan_1.default.createLogger({
    name: 'Streaming Service Logger',
    streams: [
        {
            level: 'info',
            stream: accessLog
        },
        {
            level: 'error',
            stream: errorLog
        }
    ]
});
