import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getAllPizzas, getPizzaById } from '../services/pizza.service';

export const getAll = async (
  req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const { featured } = req.query;

  try {
    const pizzas = await getAllPizzas(featured ? String(featured) === 'true' : undefined);

    res.status(200).json({
      pizzas,
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Pizzas - GET ALL]: ${error.message}`);
      next(httpError);
    }
  }
};

export const getById = async (
  req: Request<{ id: number }, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const pizza = await getPizzaById(Number(id));

    res.status(200).json({
      pizza,
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Pizzas - GET BY ID]: ${error.message}`);
      next(httpError);
    }
  }
};
