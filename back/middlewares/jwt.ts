require('dotenv').config();
const createError   = require('http-errors');
const jwt           = require('jsonwebtoken');

const generateUUID = ()=>{
    let date = new Date().getTime();
    let uuid = 'xxxxxxxx-yxxx-4xxxxxxx-xxxxx-xxxxxxxx'.replace(/[xy]/g, function(u){
                    let reg = (date + Math.random()*32)%32 | 0;
                    date = Math.floor(date/32);
                    return (u === 'x' ? reg: (reg&0x3|0x8)).toString(32);
                });
    return uuid;
};

const generateToken = async(request, response, next)=>{
    jwt.sign({ key: generateUUID() }, process.env.API_KEY, { algorithm: 'HS512' }, (error, token)=>{
        if(error){
            console.error(error);
            next (createError(error));
        }
        return response.status(200).json({ ok: true, data: token, fails: [] });
    });
};
 
export default generateToken;
