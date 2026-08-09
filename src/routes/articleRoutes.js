import express from 'express';
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { authenticate } from '../middleware/authenticate.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Створити статтю
router.post('/articles', authenticate, upload.single('image'), createArticle);

// Отримати всі статті
router.get('/articles', authenticate, getArticles);

// Отримати одну статтю
router.get('/articles/:id', authenticate, getArticleById);

// Оновити статтю
router.patch('/articles/:id', authenticate, updateArticle);

// Видалити статтю
router.delete('/articles/:id', authenticate, deleteArticle);

export default router;
