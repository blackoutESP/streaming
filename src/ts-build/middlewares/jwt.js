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
exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const generateUUID = () => {
    let date = new Date().getTime();
    let uuid = 'xxxxxxxx-yxxx-4xxxxxxx-xxxxx-xxxxxxxx'.replace(/[xy]/g, function (u) {
        let reg = (date + Math.random() * 32) % 32 | 0;
        date = Math.floor(date / 32);
        return (u === 'x' ? reg : (reg & 0x3 | 0x8)).toString(32);
    });
    return uuid;
};
const generateToken = (request, response, next) => {
    const secret = process.env.api_key;
    console.log('secret api_key: \n', secret);
    jwt.sign('Alex Algar', secret, {
        algorithm: 'HS512',
        issuer: 'small streaming service',
        audience: 'users',
        expiresIn: (1000 * 60 * 60 * 24) * 7,
        mutatePayload: true
    }, (err, token) => {
        console.error('err: ', err);
        console.log('token: ', token);
    });
};
exports.generateToken = generateToken;
