import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getArticlesByAuthorController,
  getArticleByIdController,
  getArticlesController,
  createArticle,
  deleteArticle,
} from '../controllers/articlesController.js';
import {
  getArticlesByAuthorValidation,
  getArticleByIdSchema,
  getArticlesSchema,
  createArticlesSchema,
  deleteArticleSchema,
} from '../validations/articlesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import multer from 'multer';

const router = Router();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 1024 * 1024 }, // максимум 1Mb
});

router.get('/articles', celebrate(getArticlesSchema), getArticlesController);

router.get(
  '/articles/:id',
  celebrate(getArticleByIdSchema),
  getArticleByIdController,
);

router.post(
  '/articles',
  authenticate,
  upload.single('image'),
  celebrate(createArticlesSchema),
  createArticle,
);

router.get(
  '/articles/author/:ownerId',
  celebrate(getArticlesByAuthorValidation),
  getArticlesByAuthorController,
);

router.delete(
  '/articles/:id',
  authenticate,
  celebrate(deleteArticleSchema),
  deleteArticle,
);

export default router;
