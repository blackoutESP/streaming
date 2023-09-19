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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_js_1 = require("./logger/logger.js");
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
const authMiddleware = async (request, response, next) => {
    if (request.headers.authorization || request.query.authorization) {
        let bearer = request.headers.authorization || request.query.authorization;
        console.log('token: ', bearer);
        const secret = process.env.api_key;
        jsonwebtoken_1.default.verify(request.headers.authorization?.split(' ')[1], secret, (error, decoded) => {
            if (error) {
                console.error(error);
                return next();
                logger_js_1.logger.logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
            }
            console.log(decoded);
            logger_js_1.logger.logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
            next();
        });
    }
    else {
        return next();
    }
};
exports.authMiddleware = authMiddleware;
app.use('/api/login', jwt_1.generateToken);
app.use('/api/videos', exports.authMiddleware, index_1.router);
http_1.default.createServer(app).listen(3000, () => {
    console.log(`server listening on port ${process.env.ip}:${process.env.port}`);
});
