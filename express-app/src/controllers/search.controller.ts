import { NextFunction, Request, Response } from 'express';
import { seachProducts } from '../services/search.service';
import createHttpError from 'http-errors';

export const search = async (
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req.query;

  try {
    const { drinks, pizzas } = await seachProducts(query as string);

    res.status(200).json({
      products: { pizzas, drinks },
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Search - GET ALL]: ${error.message}`);
      next(httpError);
    }
  }
};
