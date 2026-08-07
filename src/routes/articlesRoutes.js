import { Router } from 'express';
import { getArticleByIdController } from '../controllers/articlesController.js';

const router = Router();

router.get('/articles/:id', getArticleByIdController);

export default router;