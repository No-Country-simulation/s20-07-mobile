import { Router } from "express";
import { create, getAll, getById, remove, update } from "../controllers/size.controller";

const router = Router();

router.get('/', [], getAll  );
router.get('/:id', [], getById );
router.post('/', [], create );
router.put('/:id' , [],update );
router.delete('/:id', [] , remove);

export default router;