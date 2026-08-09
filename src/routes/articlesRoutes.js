import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getArticleByIdController } from '../controllers/articlesController.js';
import { getArticleByIdSchema } from '../validations/articlesValidation.js';

const router = Router();

router.get(
  '/articles/:id',
  celebrate(getArticleByIdSchema),
  getArticleByIdController,
);

export default router;