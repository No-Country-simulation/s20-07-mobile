import { Router } from 'express';
import { create } from '../controllers/customPizza.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/', [authMiddleware], create);

export default router;
