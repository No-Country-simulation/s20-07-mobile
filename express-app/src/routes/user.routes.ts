import { Router } from 'express';
import { register, login } from '../controllers/user.controller';

const router = Router();

router.post('/login', [], login);
router.post('/register', [], register);

export default router;
