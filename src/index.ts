import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import { logger } from './logger/logger.js';
import { router } from './routes/index';
import { generateToken } from './middlewares/jwt';

import packageJson from './package.json';

import * as dotenv from 'dotenv';
// console.log(dotenv.configDotenv()); Show DotEnv config
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS");
    // res.header("Access-Control-Expose-Headers", "Express");
    // res.header("Access-Control-Max-Age", "3600000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    console.log(request.url);
    if ((request.headers.authorization || request.query.authorization) || !request.url.includes('http://0.0.0.0:3000/api/login')) { // || (!request.url.includes('http://localhost:4200/api/login') || !request.url.includes('http://localhost:4200/api/videos'))
        let bearer = request.headers.authorization || request.query.authorization;
        console.log('token: ', bearer);
        const secret: string = process.env.api_key!;
        const token: string = request.headers.authorization?.split(' ')[1]!;
        jwt.verify(token, secret, (error: any, decoded: any) => {
            if (error) {
                console.error(error);
                logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' })
            }
            console.log(decoded);
            logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
            next();
        });
    } else {
        return next();
    }
}

app.use('/api/login', generateToken);
app.use('/api/videos', authMiddleware, router);

http.createServer(app).listen(3000, () => {
    console.log(`server listening on port ${process.env.ip}:${process.env.port}`);
    console.log(`current build: ${packageJson.version}`);
});