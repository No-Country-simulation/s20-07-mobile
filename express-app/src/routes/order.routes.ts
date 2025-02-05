import { Router } from 'express';
import { create } from '../controllers/order.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/', [authMiddleware], create);

export default router;
