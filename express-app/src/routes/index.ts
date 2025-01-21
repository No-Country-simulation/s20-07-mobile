import { Router } from 'express';
import ingredients from './ingredient.routes';
import pizzas from './pizza.routes';
import sizes from './size.routes';
import orders from './order.routes';
import customPizzas from './customPizza.routes';
import search from './search.routes';
import user from '../routes/user.routes';

const router = Router();

router.use('/ingredients', ingredients);
router.use('/pizzas', pizzas);
router.use('/sizes', sizes);
router.use('/orders', orders);
router.use('/custom-pizzas', customPizzas);
router.use('/search', search);
router.use('/user', user)

export default router;
