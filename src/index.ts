import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
// import { logger } from './logger/logger.js';
import { router } from './routes/index';
import { generateToken } from './middlewares/jwt';

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
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    if (request.headers.authorization || request.query.authorization) {
        let bearer = request.headers.authorization || request.query.authorization;
        console.log('token: ', bearer);
        const secret: string = process.env.api_key!;
        jwt.verify(request.headers.authorization?.split(' ')[1]!, secret, (error: any, decoded: any) => {
            if (error) {
                console.error(error);
                return next();
                // logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
            }
            console.log(decoded);
            // logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
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
});