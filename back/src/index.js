"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var index_js_1 = require("./routes/index.js");
require('dotenv').config();
var app = (0, express_1.default)();
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
// export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
//     if (request.headers.authorization || request.query.authorization) {
//         let bearer = request.headers.authorization || request.query.authorization;
//         console.log(bearer?.slice('Bearer '));
//         const secret: string = process.env.api_key || '';
//         next();
//         jwt.verify(token, secret, (error: any, decoded: any) => {
//             if (error) {
//                 console.error(error);
//                 logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
//                 next(403);
//             }
//             // console.log(decoded);
//             logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
//             next();
//         });
//     } else {
//         next();
//     }
// };
// app.use('/api/login', generateToken);
app.use('/api/videos', index_js_1.default);
http_1.default.createServer(app).listen(3000, '0.0.0.0', function () {
    console.log('server listening on port:', 3000);
});
