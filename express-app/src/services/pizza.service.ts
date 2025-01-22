import db from '../common/db';

export const getAllPizzas = async (featured?: boolean) => {
  if (featured) {
    const pizzas = await db.pizza.findMany({
      where: { featured: true },
      select: {
        id: true,
        name: true,
        featured: true,
        haveDiscount: true,
        pizzaIngredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });
    // Quitar la clave "ingredient"
    const formattedPizzas = pizzas.map((pizza) => ({
      ...pizza,
      pizzaIngredients: pizza.pizzaIngredients.map((pi) => pi.ingredient),
    }));

    return formattedPizzas;
  } else {
    const pizzas = await db.pizza.findMany({
      select: {
        id: true,
        name: true,
        featured: true,
        haveDiscount: true,
        pizzaIngredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });
    // Quitar la clave "ingredient"
    const formattedPizzas = pizzas.map((pizza) => ({
      ...pizza,
      pizzaIngredients: pizza.pizzaIngredients.map((pi) => pi.ingredient),
    }));

    return formattedPizzas;
  }
};

export const getPizzaById = async (id: number) => {
  const pizza = await db.pizza.findFirst({
    where: { id },
    select: {
      name: true,
      featured: true,
      haveDiscount: true,
      predefinedPizzas: {
        select: {
          id: true,
          price: true,
          type: true,
          size: { select: { name: true, cm: true } },
        },
      },
      pizzaIngredients: { select: { ingredient: { select: { name: true } } } },
    },
  });

  return pizza;
};
