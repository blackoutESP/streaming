"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const formidable_1 = __importDefault(require("formidable"));
const uploadVideo = (request, response, next) => {
    const data = new formidable_1.default.IncomingForm();
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
        fs_1.default.rename(JSON.stringify(files), path_1.default.join(__dirname, '../assets/', JSON.stringify(files)), (error) => {
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
