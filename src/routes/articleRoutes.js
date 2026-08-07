import express from 'express';
import { createArticle } from '../controllers/articleController.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/articles', auth, upload.single('image'), createArticle);

export default router;
