import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../models/User.js';

export const requireRole = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Non authentifié' });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ message: 'Accès refusé' });
      return;
    }

    next();
  };
};