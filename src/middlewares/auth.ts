/*
    export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
        if (request.headers.authorization || request.query.authorization) {
            let bearer = request.headers.authorization || request.query.authorization;
            console.log(bearer);
            const token = '';
            const secret: string = process.env.api_key || '';
            jwt.verify(token, secret, (error: any, decoded: any) => {
                if (error) {
                    console.error(error);
                    logger.error({ error: 'Unauthorized access', status: 403, message: 'Forbidden access.' });
                    next(403);
                }
                // console.log(decoded);
                logger.info({ error: 'Authorized access', status: 200, message: 'Authorized access.' });
                next();
            });
        } else {
            next(403);
        }
    };
*/

// const authMiddleware = async(request, _, next) => {
//     if(request.headers.authorization || request.query.authorization){
//         let bearer = request.headers.authorization || request.query.authorization;
//         let token = bearer.split(' ')[1];
//         jwt.verify(token, process.env.API_KEY, (error, decoded)=>{
//             if(error){
//                 console.error(error);
//                 logger.error({error: 'Unauthorized access'});
//                 next(createError(403));
//             }
//             // console.log(decoded);
//             logger.info({msg: 'Authorized access with token'});           
//             next();
//         });
//     }else{
//         next(createError(403));
//     }
// };