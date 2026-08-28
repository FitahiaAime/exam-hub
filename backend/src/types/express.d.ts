import 'express';
import type { UserRole } from '../models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: UserRole;
      };
    }
  }
}