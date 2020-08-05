import { promises as fs } from 'fs';
import express from 'express';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const reqId = req.params.id;

    const account = data.accounts.find((acc) => acc.id === parseInt(reqId));

    if (!account) {
      res.status(404).send('Usuário não encontrado');
    }

    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
