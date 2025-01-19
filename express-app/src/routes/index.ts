import { Router } from 'express';
import ingredients from './ingredient.routes';
import pizzas from './pizza.routes';
import sizes from './size.routes';
import orders from './order.routes';
import customPizzas from './customPizza.routes';

const router = Router();

router.use('/ingredients', ingredients);
router.use('/pizzas', pizzas);
router.use('/sizes', sizes);
router.use('/orders', orders);
router.use('/custom-pizzas', customPizzas);

export default router;
