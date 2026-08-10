import express from 'express';
import { createArticle, } from '../controllers/articleController.js';
import { authenticate } from '../middleware/authenticate.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Створити статтю
router.post('/articles', authenticate, upload.single('image'), createArticle);    

export default router;
