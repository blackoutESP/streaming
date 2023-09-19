"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { logger } from './logger/logger.js';
// import { router } from '../.old/src/routes/index.js';
// import { generateToken } from '../.old/src/middlewares/jwt.js';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD");
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.headers.authorization || request.query.authorization) {
        let bearer = request.headers.authorization || request.query.authorization;
        // const token = bearer?.slice(bearer.lastIndexOf(' '));
        console.log(bearer);
        const secret = process.env.api_key || '';
        next();
        jsonwebtoken_1.default.verify('', secret, (error, decoded) => {
            if (error) {
                console.error(error);
                //logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
                next(403);
            }
            // console.log(decoded);
            //logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
            next();
        });
    }
    else {
        next();
    }
});
exports.authMiddleware = authMiddleware;
// app.use('/api/login', generateToken);
// app.use('/api/videos', router);
http_1.default.createServer(app).listen(process.env.port, () => {
    console.log('server listening on port:', 3000);
});
