import { drinks } from './seeders/drinks';
import { ingredientes } from './seeders/ingredients';
import { pizzaIngredients } from './seeders/pizza-ingredients';
import { pizzas } from './seeders/pizzas';
import { predefinnedPizzas } from './seeders/predefined-pizzas';
import { sizes } from './seeders/sizes';
import db from '../src/common/db';

async function main() {
  await db.ingredient.createMany({ data: ingredientes });
  await db.size.createMany({ data: sizes });
  await db.pizza.createMany({ data: pizzas });
  await db.predefinedPizza.createMany({ data: predefinnedPizzas });
  await db.pizzaIngredient.createMany({ data: pizzaIngredients });
  await db.drink.createMany({ data: drinks });
}

main()
  .catch((err) => {
    console.error(err);
    // process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
