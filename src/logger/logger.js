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
exports.logger = void 0;
const bunyan = __importStar(require("bunyan"));
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
let accessLog = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { encoding: 'utf-8' });
let errorLog = fs.createWriteStream(path.join(__dirname, '../logs/error.log'), { encoding: 'utf-8' });
exports.logger = bunyan.createLogger({
    name: 'Small Streaming Service',
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
/*
{
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
}
*/
