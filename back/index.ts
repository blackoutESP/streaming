import express, { Request, Response, NextFunction } from 'express';
import http, { ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
import { router } from './routes/index';
// import authMiddleware from './middlewares/auth';
// import logger from './logger/logger';

import config from 'dotenv';
// import { logger } from './logger/logger';
const app           = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(logger);
app.use(function(_req: Request, res: Response, next: NextFunction) {
    const params = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Origin": "*"
    };
    const response = res.json();  
    
    response.header(params); // update to match the domain you will make the request from
    // res.headers("Vary", "Origin");
    // res.headers("Access-Control-Allow-Credentials", "true");
    // res.headers("Access-Control-Allow-Methods", "GET, POST, HEAD");
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(res);
});

const authMiddleware = async(req: Request, _res: Response, next: NextFunction) => {
    if(req.headers.authorization || req.query.authorization){
        let bearer = req.headers.authorization || req.query.authorization;
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
    }else{
        next(403);
    }
};

// app.use('/api/login', jwtAuth);
app.use('/api', router);

// app.use((_, response: Response, next: NextFunction, error: any)=> {
//     next(error);
// });

http.createServer(app).listen(3000, () => {
    console.log('server listening on port:', process.env.PORT);
});