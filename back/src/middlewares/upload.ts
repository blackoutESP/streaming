import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { Request, Response, NextFunction } from 'express';

export const uploadVideo = (request: Request, response: Response, next: NextFunction) => {
    const data = new formidable.IncomingForm();
    /*
        data.on('file', async(error, fields, file)=>{
            console.log(file);
            fs.rename(file.path, `${file.path}/${file.name}`, (error)=>{
                if(error){
                    console.error(error);
                }
            });
        });
    */
    data.on('end', () => {
        // send response to user
    });
    data.parse(request, (err, fields, files) => {
        //console.log(files.test);
        fs.rename(JSON.stringify(files), path.join(__dirname, '../assets/', JSON.stringify(files)), (error) => {
            if (error) {
                console.error(error);
                next();
                //return response.status(400).json({ok: false, data: [{msg: error}], fails: []});
            }
            return response.status(201).json({ ok: true, data: [{ msg: 'file uploaded correctly.' }], fails: [] });
        });
    });
};