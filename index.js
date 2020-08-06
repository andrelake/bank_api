import { promises as fs } from 'fs';
import express from 'express';
import winston from 'winston';

import accRouter from './routes/account.js';

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'bank-api.log' }),
  ],
  format: combine(label({ label: 'bank-api' }), timestamp(), myFormat),
});

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use('/account', accRouter);
app.listen(3030, async () => {
  try {
    await readFile(global.fileName);
    logger.info('API started. File readed.');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info('API started. File created.');
      })
      .catch((err) => logger.error(err));
  }
});
