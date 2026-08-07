import express from 'express';
import { upload } from '../middlewares/upload.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = express.Router();

userRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateUserAvatar),
);

export default userRouter;
