import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getArticlesByAuthorController, getArticleByIdController } from '../controllers/articlesController.js';
import { getArticlesByAuthorValidation, getArticleByIdSchema } from '../validations/articlesValidation.js';

const router = Router();

router.get('/articles/author/:ownerId', celebrate(getArticlesByAuthorValidation), getArticlesByAuthorController);

router.get(
  '/articles/:id',
  celebrate(getArticleByIdSchema),
  getArticleByIdController,
);

export default router;
