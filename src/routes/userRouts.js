import { Router } from 'express';
import {
  addArticleToSavedArticles,
  deleteArticleFromSavedArticles,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post(
  '/saved-articles/:articleId',
  authenticate,
  addArticleToSavedArticles,
);
router.delete(
  '/saved-articles/:articleId',
  authenticate,
  deleteArticleFromSavedArticles,
);

export default router;
