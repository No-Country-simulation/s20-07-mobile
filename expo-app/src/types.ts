// Definition of the types used in the application
type Ingredient = {
  id: number;
  name: string;
  extraCost: number;
};

type Pizza = {
  id: number;
  name: string;
  description: string;
  pizzaIngredients: Ingredient[];
  price: number;
};