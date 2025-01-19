import db from '../common/db';

export const seachProducts = async (query: string) => {
  const pizzas = await db.pizza.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });

  const drinks = await db.drink.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });

  return { pizzas, drinks };
};
