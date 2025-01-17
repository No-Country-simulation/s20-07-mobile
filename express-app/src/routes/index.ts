import { Router } from 'express';
import ingredients from './ingredient.routes';
import pizzas from './pizza.routes';
import sizes from "./size.routes"

const router = Router();

router.use('/ingredients', ingredients);
router.use('/pizzas', pizzas);
router.use('/sizes', sizes);


export default router;
