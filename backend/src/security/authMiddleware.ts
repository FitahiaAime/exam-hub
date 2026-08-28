import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

interface JwtPayload {
  userId: number;
  role: 'admin' | 'student';
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant' });
    return;
  }

  const token = authHeader.slice('Bearer '.length);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: 'Configuration serveur invalide' });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};