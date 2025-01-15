import { Router } from 'express';
import ingredients from './ingredient.routes';

const router = Router();

router.use('/ingredients', ingredients);

export default router;
