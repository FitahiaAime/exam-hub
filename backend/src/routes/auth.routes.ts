import { Router } from 'express';
import { loginController } from '../controllers/AuthController.js';
import { authMiddleware } from '../security/authMiddleware.js';

export const authRouter = Router();

authRouter.post('/login', loginController);

authRouter.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});