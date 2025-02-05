import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import {
  getIngredientById,
  getIngredients,
  createIngredient,
  updateIngredient,
  removeIngredient,
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
    const newIngredient = await createIngredient({ name, extraCost });

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

export const update = async (
  req: Request<{ id: string }, unknown, { name: string; extraCost: number }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, extraCost } = req.body;
  try {
    const updatedIngredient = await updateIngredient(Number(id), { name, extraCost });

    res.status(200).json({
      ingredient: updatedIngredient,
    });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - UPDATE]: ${error.message}`);
      next(httpError);
    }
  }
};

export const remove = async (
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    await removeIngredient(Number(id));

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Ingredients - DELETE]: ${error.message}`);
      next(httpError);
    }
  }
};
