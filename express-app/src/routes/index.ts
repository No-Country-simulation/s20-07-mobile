import { Router } from 'express';
import ingredients from './ingredient.routes';
import pizzas from './pizza.routes';

const router = Router();

router.use('/ingredients', ingredients);
router.use('/pizzas', pizzas);

export default router;
