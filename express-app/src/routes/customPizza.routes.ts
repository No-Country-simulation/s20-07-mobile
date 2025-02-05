import { Router } from 'express';
import { create, getById } from '../controllers/customPizza.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.get('/:id', [], getById);
router.post('/', [authMiddleware], create);

export default router;
