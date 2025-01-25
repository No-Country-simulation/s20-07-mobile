// Definition of the types used in the application
type Ingredient = {
  id: number;
  name: string;
  extraCost: number;
};

type Pizza = {
  id: number
  name: string
  image: string | null
  description: string | null
  pizzaIngredients: { ingredient: { name: string } }[]
  predefinedPizzas: { size: { name: string }; price: number }[] // Agrega precios por tamaño
}
