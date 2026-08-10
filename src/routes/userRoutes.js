import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
    getUsers,
    getUserById,
    getSavedArticles,
    addArticleToSavedArticles,
    deleteArticleFromSavedArticles,
} from '../controllers/userController.js';

import {
    getUsersSchema,
    getUserByIdSchema,
} from '../validations/userValidation.js';

import { authenticate } from '../middleware/authenticate.js';
import { getArticleByIdSchema } from '../validations/articlesValidation.js';

const router = Router();

router.get('/users', celebrate(getUsersSchema), getUsers);
router.get('/users/:id', celebrate(getUserByIdSchema), getUserById);
router.get('/saved-articles',
    authenticate,
    getSavedArticles,
);
router.post(
    '/saved-articles/:id',
    authenticate,
    celebrate(getArticleByIdSchema),
    addArticleToSavedArticles,
);
router.delete(
    '/saved-articles/:id',
    authenticate,
    celebrate(getArticleByIdSchema),
    deleteArticleFromSavedArticles,
);


export default router;
