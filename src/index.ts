import express from 'express';
import dotenv from 'dotenv';
import { runDb } from './repositories/db';

import { productsRouter } from './routes/products-router';
import { emailRouter } from './routes/email-router';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());

app.use('/products', productsRouter);
app.use('/email', emailRouter);

const startApp = async () => {
  try {
    await runDb();

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

startApp();
