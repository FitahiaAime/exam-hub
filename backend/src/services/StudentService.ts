import bcrypt from 'bcryptjs';
import {
  createUser,
  findUserByEmail,
  findUserById,
  listUsersByRole,
  setUserActive,
  updateUser,
} from '../repositories/UserRepository.js';
import { toSafeUser } from '../models/User.js';
import type { SafeUser, User } from '../models/User.js';

export class StudentError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const ensureIsStudent = (user: User | null): User => {
  if (!user || user.role !== 'student') {
    throw new StudentError('Etudiant introuvable', 404);
  }

  return user;
};

export const listStudents = async (): Promise<SafeUser[]> => {
  const students = await listUsersByRole('student');
  return students.map(toSafeUser);
};

export const getStudentById = async (id: string): Promise<SafeUser> => {
  const user = await findUserById(id);
  const student = ensureIsStudent(user);

  return toSafeUser(student);
};

export const createStudent = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<SafeUser> => {
  const existing = await findUserByEmail(data.email);

  if (existing) {
    throw new StudentError('Un compte existe deja avec cet email', 409);
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  const user = await createUser({
    name: data.name,
    email: data.email,
    passwordHash,
    role: 'student',
  });

  return toSafeUser(user);
};

export const updateStudent = async (
  id: string,
  data: { name?: string; email?: string },
): Promise<SafeUser> => {
  const existing = await findUserById(id);
  ensureIsStudent(existing);

  if (data.email) {
    const emailOwner = await findUserByEmail(data.email);

    if (emailOwner && emailOwner.id !== id) {
      throw new StudentError('Un compte existe deja avec cet email', 409);
    }
  }

  const updated = await updateUser(id, data);

  if (!updated) {
    throw new StudentError('Etudiant introuvable', 404);
  }

  return toSafeUser(updated);
};

export const setStudentActive = async (id: string, isActive: boolean): Promise<SafeUser> => {
  const existing = await findUserById(id);
  ensureIsStudent(existing);

  const updated = await setUserActive(id, isActive);

  if (!updated) {
    throw new StudentError('Etudiant introuvable', 404);
  }

  return toSafeUser(updated);
};
