import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/UserRepository.js';
import { toSafeUser } from '../models/User.js';
import type { SafeUser } from '../models/User.js';

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface LoginResult {
  token: string;
  user: SafeUser;
}

export const login = async (email: string, password: string): Promise<LoginResult> => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AuthError('Email ou mot de passe incorrect', 401);
  }

  if (!user.isActive) {
    throw new AuthError('Compte désactivé', 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AuthError('Email ou mot de passe incorrect', 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET manquant dans la configuration');
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ?? '1h') as SignOptions['expiresIn'];

  const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn });

  return { token, user: toSafeUser(user) };
};