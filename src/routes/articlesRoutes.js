import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getArticleByIdController,
  getArticlesController,
} from '../controllers/articlesController.js';
import {
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

export default router;
