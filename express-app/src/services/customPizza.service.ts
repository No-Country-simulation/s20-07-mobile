import db from '../common/db';

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

export const createCustomPizza = async (customPizza: CustomPizza, userId: number) => {
  const { id } = await db.customPizza.create({
    data: {
      sizeId: customPizza.sizeId,
      userId,
      name: customPizza.name,
    },
  });

  const customPizzaIngredients = customPizza.ingredients.map((item) =>
    db.customPizzaIngredient.create({
      data: {
        customPizzaId: id,
        ingredientId: item.id,
      },
    }),
  );

  await Promise.all(customPizzaIngredients);

  return { id };
};
