import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getArticlesByAuthorController,
  getArticleByIdController,
  getArticlesController,
} from '../controllers/articlesController.js';
import {
  getArticlesByAuthorValidation,
  getArticleByIdSchema,
  getArticlesSchema,
} from '../validations/articlesValidation.js';

const router = Router();

router.get('/articles', celebrate(getArticlesSchema), getArticlesController);

router.get(
  '/articles/:id',
  celebrate(getArticleByIdSchema),
  getArticleByIdController,
);

router.get(
  '/articles/author/:ownerId',
  celebrate(getArticlesByAuthorValidation),
  getArticlesByAuthorController,
);

export default router;
