import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export const authGuardMiddleware = (
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
