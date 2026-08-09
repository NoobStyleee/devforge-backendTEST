import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getUsers, getUserById, getSavedArticles, } from '../controllers/userController.js';
import { getUsersSchema, getUserByIdSchema } from '../validations/userValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/users', celebrate(getUsersSchema), getUsers);
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);

router.get('/saved-articles', authenticate, getSavedArticles);

export default router;
