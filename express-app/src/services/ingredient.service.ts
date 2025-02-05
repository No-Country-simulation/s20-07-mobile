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

export const updateIngredient = async (
  id: number,
  ingredient: { name?: string; extraCost?: number },
) => {
  const updatedIngredient = await db.ingredient.update({
    where: { id },
    data: { ...ingredient },
  });

  return updatedIngredient;
};
export const removeIngredient = async (id: number) => {
  const deletedIngredient = await db.ingredient.delete({
    where: { id },
  });

  return deletedIngredient;
};
