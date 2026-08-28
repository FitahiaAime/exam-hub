import type { Request, Response } from 'express';
import { login, AuthError } from '../services/AuthService.js';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email et mot de passe requis' });
    return;
  }

  try {
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: 'Erreur serveur' });
  }
};