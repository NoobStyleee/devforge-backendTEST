import express from 'express';
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Створити статтю
router.post('/articles', auth, upload.single('image'), createArticle);

// Отримати всі статті
router.get('/articles', auth, getArticles);

// Отримати одну статтю
router.get('/articles/:id', auth, getArticleById);

// Оновити статтю
router.patch('/articles/:id', auth, updateArticle);

// Видалити статтю
router.delete('/articles/:id', auth, deleteArticle);

export default router;
