import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';
import { updateArticleSchema } from '../validations/articles.js';
import { updateArticle } from '../controllers/articles.js';

const router = Router();

router.patch(
  '/articles/:id',
  authenticate,
  upload.single('photo'),
  celebrate(updateArticleSchema),
  updateArticle,
);

export default router;
