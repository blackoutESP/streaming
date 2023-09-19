"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bunyan_1 = require("bunyan");
var fs = require("fs");
var accessLog = fs.createWriteStream('../logs/access.log', { encoding: 'utf-8' });
var errorLog = fs.createWriteStream('../logs/error.log', { encoding: 'utf-8' });
var logger = bunyan_1.default.createLogger({
    name: 'Small Streaming Service Logger',
    streams: [
        {
            type: 'info',
            stream: accessLog
        },
        {
            type: 'error',
            stream: errorLog
        }
    ]
});
exports.default = logger;
