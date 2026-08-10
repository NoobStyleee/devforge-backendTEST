import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getArticleByIdController,
  getArticlesController,
  createArticle
} from '../controllers/articlesController.js';
import {
  getArticleByIdSchema,
  getArticlesSchema,
  createArticlesSchema
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

router.post('/articles', authenticate , upload.single('image'), celebrate(createArticlesSchema), createArticle);

export default router;
