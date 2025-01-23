import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { createCustomPizza, getCustomPizzaById } from '../services/customPizza.service';

interface Ingredient {
  id: number;
  name: string;
  extraCost: number;
}

interface CustomPizza {
  sizeId: number;
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
export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const customPizza = await getCustomPizzaById(Number(id));

    if (!customPizza) {
      return next(createHttpError(404, 'Pizza personalizada no encontrada'));
    }

    res.status(200).json(customPizza);
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - GET BY ID]: ${error.message}`);
      next(httpError);
    }
  }
};
