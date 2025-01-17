import db from '../common/db';

export const getAllPizzas = async () => {
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
    pizzaIngredient: pizza.pizzaIngredients.map((pi) => pi.ingredient),
  }));

  return formattedPizzas;
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
/* export const getPizzaById = async (id: number) => {
  const pizzas = await db.predefinedPizza.findMany({
    where: { pizzaId: id },
    select: {
      id: true,
      pizza: {
        select: {
          name: true,
          pizzaIngredients: {
            select: {
              ingredient: true,
            },
          },
        },
      },
      size: true,
      price: true,
    },
  });

  // quitar la clave "ingredient"
  const formattedPizzas = pizzas.map((pizza) => ({
    ...pizza,
    pizza: {
      ...pizza.pizza,
      pizzaIngredients: pizza.pizza.pizzaIngredients.map((pi) => pi.ingredient),
    },
  }));

  return formattedPizzas;
}; */
