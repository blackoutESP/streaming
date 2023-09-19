import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const generateUUID = () => {
    let date = new Date().getTime();
    let uuid = 'xxxxxxxx-yxxx-4xxxxxxx-xxxxx-xxxxxxxx'.replace(/[xy]/g, function (u) {
        let reg = (date + Math.random() * 32) % 32 | 0;
        date = Math.floor(date / 32);
        return (u === 'x' ? reg : (reg & 0x3 | 0x8)).toString(32);
    });
    return uuid;
};

export const generateToken = (request: Request, response: Response, next: NextFunction) => {
    const api_key_secret: string = process.env.api_key!;
    const api_jwt_secret: string = process.env.jwt_secret!;
    jwt.sign({ name: api_jwt_secret }, api_key_secret, {
        algorithm: 'HS512',
        issuer: 'small streaming service',
        audience: 'users',
        expiresIn: (1000 * 60 * 60 * 24) * 7, // 7d
        mutatePayload: true
    }, (error, encoded) => {
        return response.status(200).json({ ok: true, token: encoded, errors: error });
    });
};
