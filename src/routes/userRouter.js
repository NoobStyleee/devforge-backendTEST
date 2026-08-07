import express from 'express';
import { upload } from '../middlewares/upload.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();

router.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
