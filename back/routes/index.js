const express           = require('express');
const router            = express.Router();
const fs                = require('fs');
const path              = require('path');
const formidable        = require('formidable');


router.get('/videos', async(request, response, next)=>{
    fs.readdir(path.join(__dirname, '../assets/'), { encoding: 'utf-8' }, (error, files)=>{
        if(error){
            console.error(error);
        }
        if(files.length > 0){
            response.status(200).json({ok: true, data: files, fails:[]});
        }else{
            response.status(404).json({ok: false, data: [], fails:[{msg: 'No videos found.'}]});
        }
    });
});

router.get('/video/:id', async(request, response, next)=>{
    const id            = request.params.id;
    const assets        = path.join(__dirname, '../assets/');
    const filePath      = path.join(assets, id);
    const size          = fs.statSync(filePath).size;
    const ext           = path.extname(filePath);
    const range         = request.headers.range;
    if(range){
        const bytes     = range.replace(/bytes=/, '').split('-');
        const start     = parseInt(bytes[0], 10);
        const end       = bytes[1] ? parseInt(bytes[1], 10) : size - 1;
        const chunkSize = (end-start) + 1;
        const headers   = {
            'Accept-Ranges': 'bytes',
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Content-Type': `video/${ext}`,
            'Content-Length': chunkSize
        };
        const stream    = fs.createReadStream(filePath, { start, end });
        response.writeHead(206, headers);
        stream.pipe(response);
    }else{
        // first time video is requested this will be executed
        const headers   = {
            'Content-Type': `video/${ext}`,
            'Content-Length': size
        };
        response.writeHead(200, headers);
        const stream    = fs.createReadStream(filePath);
        stream.pipe(response);
    }
});

router.post('/upload', async(request, response, next)=>{
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
                //return response.status(400).json({ok: false, data: [{msg: error}], fails: []});
            }
            return response.status(201).json({ok: true, data: [{msg: 'file uploaded correctly.'}], fails: []});
        });
    });
});

module.exports = router;