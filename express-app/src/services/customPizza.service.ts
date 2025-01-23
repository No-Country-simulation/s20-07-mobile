import { CustomPizza as CPizza } from '@prisma/client';
import db from '../common/db';

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

export const getCustomPizzaById = async (id: number) => {
  const customPizza = await db.customPizza.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: true,
    },
  });

  const price = await calculatePizzaPrice(customPizza);

  return { ...customPizza, price };
};

const calculatePizzaPrice = async (customPizza: any) => {
  const size = await db.size.findUnique({
    where: { id: customPizza.sizeId },
  });

  if (!size) {
    throw new Error('Size not found');
  }

  const ingredients = await Promise.all(
    customPizza.ingredients.map(
      async (ingredient: any) => await db.ingredient.findUnique({ where: { id: ingredient.id } }),
    ),
  );

  const totalPrice = size.basePrice + ingredients.reduce((acc, item) => acc + item.extraCost, 0);

  return totalPrice;
};
