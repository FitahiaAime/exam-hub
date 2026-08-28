export type UserRole = 'admin' | 'student';

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export const toSafeUser = (user: User): SafeUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});