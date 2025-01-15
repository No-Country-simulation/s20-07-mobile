import db from '../common/db';

export const getIngredients = async () => {
  const ingredients = await db.ingredient.findMany({});

  return ingredients;
};

export const getIngredientById = async (id: number) => {
  const ingredient = await db.ingredient.findFirst({
    where: { id },
  });

  return ingredient;
};

export const createIngredient = async (ingredient: { name: string; extraCost: number }) => {
  const newIngredient = await db.ingredient.create({
    data: { ...ingredient },
  });

  return newIngredient;
};
