import { promises as fs } from 'fs';
import express from 'express';

import accRouter from './routes/account.js';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('./account', accRouter);

app.listen(3030, async () => {
  try {
    await readFile('accounts.json');
    console.log('API started. File readed.');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    writeFile('accounts.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API started. File created.');
      })
      .catch((err) => console.log(err));
  }
});
