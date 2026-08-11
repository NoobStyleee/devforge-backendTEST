import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';
import { loginUser } from '../controllers/authController.js';
import { loginUserSchema } from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', authenticate, logoutUser);

export default router;
