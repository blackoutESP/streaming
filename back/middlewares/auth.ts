export const authMiddleware = async(request, _, next) => {
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