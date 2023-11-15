import { Request, Response, Router } from 'express';
import {
  productsRepository,
  ProductType,
} from '../repositories/products-repository';
import { body } from 'express-validator';

import {
  inputValidationMiddleware,
  authGuardMiddleware,
} from '../middlewares/input-validation.middleware';

export const productsRouter = Router();

const titleValidation = body('title')
  .isLength({ min: 3, max: 10 })
  .trim()
  .withMessage('Title length should be from 3 to 10');

productsRouter.get(
  '/',
  authGuardMiddleware,
  async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsRepository.findProducts(
      req.query.title?.toString()
    );
    res.send(foundProducts);
  }
);

productsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const product = productsRepository.getProductById(+id);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const isUpdated = await productsRepository.updateProduct(+id, req.body.title);

  if (isUpdated) {
    const product = productsRepository.getProductById(+id);
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.post(
  '/',
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const newProduct: ProductType = await productsRepository.createProduct(
      title
    );

    res.status(201).send(newProduct);
  }
);
