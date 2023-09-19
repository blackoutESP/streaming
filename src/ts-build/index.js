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
const index_1 = require("./routes/index");
const jwt_1 = require("./middlewares/jwt");
const dotenv = __importStar(require("dotenv"));
// console.log(dotenv.configDotenv()); Show DotEnv config
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS");
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (request.headers.authorization || request.query.authorization) {
        let bearer = request.headers.authorization || request.query.authorization;
        // const token = bearer?.slice(bearer.lastIndexOf(' '));
        console.log('token: ');
        const secret = process.env.api_key;
        next();
        jsonwebtoken_1.default.verify((_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], secret, (error, decoded) => {
            if (error) {
                console.error(error);
                // logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
                next(403);
            }
            // console.log(decoded);
            // logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
            return next(200);
        });
    }
    else {
        return next(403);
    }
});
exports.authMiddleware = authMiddleware;
app.use('/api/login', jwt_1.generateToken);
app.use('/api', exports.authMiddleware, index_1.router);
http_1.default.createServer(app).listen(3000, () => {
    console.log(`server listening on port ${process.env.ip}:${process.env.port}`);
});
