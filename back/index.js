const config        = require('./config');
const express       = require('express');
const http          = require('http');
const createError   = require('http-errors');
const cors          = require('cors');
const jwt           = require('jsonwebtoken');
const logger        = require('./logger/logger');

const app           = express();
const jwtAuth       = require('./middlewares/jwt');
const indexRouter   = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: 'http://localhost:4200'
}));

const authMiddleware = async(request, response, next)=>{
    if(request.headers.authorization || request.query.authorization){
        let bearer = request.headers.authorization || request.query.authorization;
        let token = bearer.split(' ')[1];
        jwt.verify(token, config.jwt.api_key, (error, decoded)=>{
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
app.use('/api', authMiddleware, indexRouter);

app.use((request, response, next)=>{
    next(createError(404));
});

http.createServer(app).listen(config.http.port, ()=>{
    console.log('server listening on port *:3000');
});