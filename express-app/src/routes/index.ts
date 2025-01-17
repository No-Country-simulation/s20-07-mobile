import { Router } from 'express';
import ingredients from './ingredient.routes';
import sizes from "./size.routes"

const router = Router();

router.use('/ingredients', ingredients);
router.use('/sizes', sizes);

export default router;
