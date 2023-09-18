var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import { logger } from './logger/logger.js';
import router from './routes/index.js';
import { generateToken } from './middlewares/jwt.js';
require('dotenv').config();
const app = express();
// const jwtAuth = require('./middlewares/jwt');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200/"); // update to match the domain you will make the request from
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD");
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
export const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.headers.authorization || request.query.authorization) {
        let bearer = request.headers.authorization || request.query.authorization;
        console.log(bearer);
        const token = '';
        const secret = process.env.api_key || '';
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                console.error(error);
                logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
                next(403);
            }
            // console.log(decoded);
            logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
            next();
        });
    }
    else {
        next(403);
    }
});
app.use('/api/login', generateToken);
app.use('/api', authMiddleware, router);
// app.use((request, response, next) => {
//     console.log(error);
//     next(createError(error));
// });
http.createServer(app).listen(3000, () => {
    console.log('server listening on port:', 3000);
});
