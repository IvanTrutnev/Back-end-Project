import express from 'express';
import dotenv from 'dotenv';
import { runDb } from './repositories/db';

import { productsRouter } from './routes/products-router';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());

app.use('/products', productsRouter);

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
