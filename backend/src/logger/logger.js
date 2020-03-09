import winston from 'winston';
const { combine, errors, json, timestamp, printf, colorize } = winston.format;
import path from 'path';
require('winston-daily-rotate-file');
/**
 * I found a example is great for config winston at https://github.com/winstonjs/winston/tree/master/examples
 */

let errorLogTransports = new (winston.transports.DailyRotateFile)({
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    dirname: path.join(__dirname, '../../logs/errors'),
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '1d',
    level: 'error'
});

let errorLogNormal = new (winston.transports.DailyRotateFile)({
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    dirname: path.join(__dirname, '../../logs'),
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '1d',
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    exitOnError: false,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        errors({ stack: true }),
        json()
    ),

    transports: process.env.NODE_ENV !== 'test' ? [
        errorLogTransports,
        errorLogNormal
    ] : []
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize(),
            json(),
            printf(infor => {
                let str = `\n${infor.timestamp}\n[${infor.level}] : ${JSON.stringify(infor.message)}\n`;
                // eslint-disable-next-line no-console
                console.log(str, infor.stack ? infor.stack : '');
                return '';
            })
        ),
    }));
}

export default logger;
