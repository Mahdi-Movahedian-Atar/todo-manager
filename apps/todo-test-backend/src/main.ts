import express from 'express';
import { getPort, getURL } from './helpers/getStatic';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as path from 'path';
import { SetRouters } from './routers';
import mongoose from 'mongoose';
import * as process from 'process';

const app = express();

require('dotenv').config();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors({ origin: process.env.ALLOWED_URL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to **** todo-test-backend!' });
});

app.get('/hello', (req, res) => {
  res.send({ message: 'Hello!' });
});

SetRouters(app);

const port = getPort();

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.warn);

async function db() {
  await mongoose.connect(getURL());
  mongoose.connection.on('error', (error: Error) => {
    console.log(error);
  });
}
db();
