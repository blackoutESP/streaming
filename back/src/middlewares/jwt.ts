import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const generateUUID = () => {
    let date = new Date().getTime();
    let uuid = 'xxxxxxxx-yxxx-4xxxxxxx-xxxxx-xxxxxxxx'.replace(/[xy]/g, function (u) {
        let reg = (date + Math.random() * 32) % 32 | 0;
        date = Math.floor(date / 32);
        return (u === 'x' ? reg : (reg & 0x3 | 0x8)).toString(32);
    });
    return uuid;
};

export const generateToken = async (request: Request, response: Response, next: NextFunction) => {
    const secret: string = process.env.api_key || '';
    jwt.sign({ key: generateUUID() }, secret, { algorithm: 'HS512' }, (error, token) => {
        if (error) {
            console.error(error);
            return next(error);
        }
        return response.status(200).json({ ok: true, data: token, errors: [] });
    });
};
