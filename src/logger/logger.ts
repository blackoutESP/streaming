import bunyan from 'bunyan';
import path from 'path';
import * as fs from 'fs';

let accessLog = fs.createWriteStream('../logs/access.log', { encoding: 'utf-8' });
let errorLog = fs.createWriteStream('../logs/error.log', { encoding: 'utf-8' });

export const logger = bunyan.createLogger({ name: 'Small Streaming Service' });

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
