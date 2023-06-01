import express from 'express';

import { productsRouter } from './routes/products-router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
