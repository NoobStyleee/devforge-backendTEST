import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getUsers, getUserById } from '../controllers/userController.js';
import { getUsersSchema, getUserByIdSchema } from '../validations/userValidation.js';

const router = Router();

router.get('/users', celebrate(getUsersSchema), getUsers);
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);

export default router;
