"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var formidable_1 = require("formidable");
var uploadVideo = function (request, response, next) {
    var data = new formidable_1.default.IncomingForm();
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
    data.on('end', function () {
        // send response to user
    });
    data.parse(request, function (err, fields, files) {
        //console.log(files.test);
        fs_1.default.rename(JSON.stringify(files), path_1.default.join(__dirname, '../assets/', JSON.stringify(files)), function (error) {
            if (error) {
                console.error(error);
                next();
                //return response.status(400).json({ok: false, data: [{msg: error}], fails: []});
            }
            return response.status(201).json({ ok: true, data: [{ msg: 'file uploaded correctly.' }], fails: [] });
        });
    });
};
exports.uploadVideo = uploadVideo;
