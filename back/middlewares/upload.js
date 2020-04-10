const fs        = require('fs');
const path      = require('path');
const formidable        = require('formidable');

module.exports = {
    uploadVideo: (request, response, next) => {
        const data          = new formidable.IncomingForm();
        data.type           = true;
        data.uploadDir      = path.join(__dirname, '../assets/');
        data.keepExtensions = true;
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
        data.on('end', ()=>{
            // send response to user
        });
        data.parse(request, (err, fields, files)=>{
            //console.log(files.test);
            fs.rename(files.test.path, path.join(__dirname, '../assets/', files.test.name), (error)=>{
                if(error){
                    console.error(error);
                    next();
                    //return response.status(400).json({ok: false, data: [{msg: error}], fails: []});
                }
                return response.status(201).json({ok: true, data: [{msg: 'file uploaded correctly.'}], fails: []});
            });
        });
    }
};