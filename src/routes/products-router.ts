import { Request, Response, Router, NextFunction } from 'express';
import { productsRepository } from '../repositories/products-repository';

export const productsRouter = Router();

const authGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.token === '123') {
    next();
  } else {
    res.send(401);
  }
};

productsRouter.get('/', authGuardMiddleware, (req: Request, res: Response) => {
  const foundProducts = productsRepository.findProducts(
    req.query.title?.toString()
  );
  res.send(foundProducts);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const product = productsRepository.getProductById(+id);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.post('/', (req: Request, res: Response) => {
  const { title } = req.body;

  const newProduct = productsRepository.createProduct(title);

  res.status(201).send(newProduct);
});
