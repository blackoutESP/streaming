const config        = require('./config');
const express       = require('express');
const http          = require('http');
const createError   = require('http-errors');
const jwt           = require('jsonwebtoken');
const logger        = require('./logger/logger');

require('dotenv').config()
const PORT = process.env.PORT;

const app           = express();
const jwtAuth       = require('./middlewares/jwt');
const indexRouter   = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD");
    // Access-Control-Expose-Headers
    // Access-Control-Max-Age
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const authMiddleware = async(request, _, next) => {
    if(request.headers.authorization || request.query.authorization){
        let bearer = request.headers.authorization || request.query.authorization;
        let token = bearer.split(' ')[1];
        jwt.verify(token, process.env.API_KEY, (error, decoded)=>{
            if(error){
                console.error(error);
                logger.error({error: 'Unauthorized access'});
                next(createError(403));
            }
            // console.log(decoded);
            logger.info({msg: 'Authorized access with token'});           
            next();
        });
    }else{
        next(createError(403));
    }
};

app.use('/api/login', jwtAuth);
app.use('/api', authMiddleware, indexRouter); // authMiddleware, TODO: fix middleware function

// app.use((_, response, next, error)=> {
//     next(createError(response.errored));
// });

http.createServer(app).listen(process.env.PORT, ()=>{
    console.log('server listening on port:', process.env.PORT);
});