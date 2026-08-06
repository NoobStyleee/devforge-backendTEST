import { Router } from 'express';
import { getArticlesByAuthorController } from '../controllers/articlesController.js';
import { getArticlesByAuthorValidation } from '../validations/articlesValidation.js';

const router = Router();

router.get('/articles/author/:authorId', getArticlesByAuthorValidation, getArticlesByAuthorController);

export default router;
