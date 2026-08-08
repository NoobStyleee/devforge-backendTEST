import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getArticlesByAuthorController } from '../controllers/articlesController.js';
import { getArticlesByAuthorValidation } from '../validations/articlesValidation.js';

const router = Router();

router.get('/articles/author/:authorId', celebrate(getArticlesByAuthorValidation), getArticlesByAuthorController);

export default router;
