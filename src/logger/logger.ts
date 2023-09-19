import * as bunyan from 'bunyan';
import * as path from 'node:path';
import * as fs from 'node:fs';

let accessLog = fs.createWriteStream('../logs/access.log', { encoding: 'utf-8' });
let errorLog = fs.createWriteStream('../logs/error.log', { encoding: 'utf-8' });

export const logger = bunyan.createLogger({
    name: 'Small Streaming Service',
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