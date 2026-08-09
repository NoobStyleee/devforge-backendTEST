import express from 'express';
import { upload } from '../middleware/upload.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const userRouter = express.Router();

userRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default userRouter;
