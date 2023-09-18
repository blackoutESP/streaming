var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const generateToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.api_key || '';
    jwt.sign({ key: generateUUID() }, secret, { algorithm: 'HS512' }, (error, token) => {
        if (error) {
            console.error(error);
            return next(error);
        }
        return response.status(200).json({ ok: true, data: token, errors: [] });
    });
});
