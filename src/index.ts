import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());

let products = [
  { id: 1, title: 'Banana' },
  { id: 2, title: 'Tomato' },
];

app.get('/', (req: Request, res: Response) => {
  res.send(products);
});

app.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === +id);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

app.post('/', (req: Request, res: Response) => {
  const { title } = req.body;
  console.log(req.body);
  console.log(title);

  const newProduct = {
    id: +new Date(),
    title,
  };

  products.push(newProduct);

  res.status(201).send(newProduct);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
