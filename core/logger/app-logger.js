import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as fs from 'fs';
import config from '../config/config.dev';

const dir = config.logFileDir;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    }),
    new DailyRotateFile({
      filename: config.logFileName,
      dirname: config.logFileDir,
      maxsize: 20971520, // 20MB
      maxFiles: 25,
      datePattern: '.dd-MM-yyyy',
    }),
  ],
});

export default logger;
