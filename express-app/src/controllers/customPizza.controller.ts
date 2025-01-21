import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { createCustomPizza } from '../services/customPizza.service';

interface Ingredient {
  id: number;
  name: string;
  extraCost: number;
}

interface CustomPizza {
  sizeId: number;
  userId?: number;
  name?: string;
  ingredients: Ingredient[];
}

export const create = async (
  req: Request<unknown, unknown, { customPizza: CustomPizza }>,
  res: Response,
  next: NextFunction,
) => {
  const { customPizza } = req.body;

  const userId = req?.user?.id || null;

  try {
    const { id } = await createCustomPizza(customPizza, userId);

    res.status(201).json({
      newOrder: {
        id,
        message: 'Pizza personalizada creada',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - CREATE]: ${error.message}`);
      next(httpError);
    }
  }
};
