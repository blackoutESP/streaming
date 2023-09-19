import * as bunyan from 'bunyan';
import * as path from 'node:path';
import * as fs from 'node:fs';


let accessLog = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { encoding: 'utf-8' });
let errorLog = fs.createWriteStream(path.join(__dirname, '../logs/error.log'), { encoding: 'utf-8' });

export const logger: any = bunyan.createLogger({
    name: 'Small Streaming Service',
    streams: [
        {
            level: 'info',
            stream: accessLog
        },
        {
            level: 'error',
            stream: process.stderr
        },
        {
            level: 'error',
            stream: errorLog
        }
    ]
});

/*
{
    name: 'Small Streaming Service Logger',
    streams: [
        {
            type: 'info',
            stream: accessLog
        },
        {
            type: 'error',
            stream: errorLog
        }
    ]
}
*/
