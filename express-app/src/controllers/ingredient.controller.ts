import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import {
  getIngredientById,
  getIngredients,
  createIngredient,
} from '../services/ingredient.service';

export const getAll = async (
  _req: Request<unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ingredients = await getIngredients();

    res.status(200).json({
      ingredients,
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - GET ALL]: ${error.message}`);
      next(httpError);
    }
  }
};
export const getById = async (
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const ingredient = await getIngredientById(Number(id));

    res.status(200).json({
      ingredient,
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - GET ALL]: ${error.message}`);
      next(httpError);
    }
  }
};
export const create = async (
  req: Request<unknown, unknown, { name: string; extraCost: number }>,
  res: Response,
  next: NextFunction,
) => {
  const { name, extraCost } = req.body;
  try {
    const newIngredient = createIngredient({ name, extraCost });

    res.status(201).json({
      ingredient: newIngredient,
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - CREATE]: ${error.message}`);
      next(httpError);
    }
  }
};
