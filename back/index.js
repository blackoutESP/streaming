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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var index_1 = require("./routes/index");
// import { logger } from './logger/logger';
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//app.use(logger);
app.use(function (_req, res, next) {
    var params = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Origin": "*"
    };
    var response = res.json();
    response.header(params); // update to match the domain you will make the request from
    // res.headers("Vary", "Origin");
    // res.headers("Access-Control-Allow-Credentials", "true");
    // res.headers("Access-Control-Allow-Methods", "GET, POST, HEAD");
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(res);
});
var authMiddleware = function (req, _res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bearer;
    return __generator(this, function (_a) {
        if (req.headers.authorization || req.query.authorization) {
            bearer = req.headers.authorization || req.query.authorization;
            console.log(bearer);
            // jwt.verify(token, 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJpc2o5dmRmMS04MXQ5LTRydWE5NGQ5LTFiZmh0LTk3b2l2dnZrIiwiaWF0IjoxNjk0NjY4MDgzfQ.js7-dDXwuDo9SRegB7r_PLADGG493jUQ1du9N2CQKKrwbEozWEW-Xb0mlnShXQBjQDy-TQns0PZmOJ16R64lPw', (error: any, decoded: any)=>{
            //     if(error){
            //         console.error(error);
            //         // logger.error({error: 'Unauthorized access'});
            //         next(403);
            //     }
            //     // console.log(decoded);
            //     // logger.info({msg: 'Authorized access with token'});           
            //     next();
            // });
            next();
        }
        else {
            next(403);
        }
        return [2 /*return*/];
    });
}); };
// app.use('/api/login', jwtAuth);
app.use('/api', index_1.router);
// app.use((_, response: Response, next: NextFunction, error: any)=> {
//     next(error);
// });
http_1.default.createServer(app).listen(3000, function () {
    console.log('server listening on port:', process.env.PORT);
});
