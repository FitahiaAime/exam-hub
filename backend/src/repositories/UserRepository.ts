import { pool } from '../config/db.js';
import type { User, UserRole } from '../models/User.js';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query(
    `SELECT id, name, email, password_hash AS "passwordHash", role, is_active AS "isActive", created_at AS "createdAt"
     FROM users
     WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query(
    `SELECT id, name, email, password_hash AS "passwordHash", role, is_active AS "isActive", created_at AS "createdAt"
     FROM users
     WHERE id = $1`,
    [id],
  );

  return result.rows[0] ?? null;
};

export const listUsersByRole = async (role: UserRole): Promise<User[]> => {
  const result = await pool.query(
    `SELECT id, name, email, password_hash AS "passwordHash", role, is_active AS "isActive", created_at AS "createdAt"
     FROM users
     WHERE role = $1
     ORDER BY created_at DESC`,
    [role],
  );

  return result.rows;
};

export const createUser = async (data: {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_active)
     VALUES ($1, $2, $3, $4, true)
     RETURNING id, name, email, password_hash AS "passwordHash", role, is_active AS "isActive", created_at AS "createdAt"`,
    [data.name, data.email, data.passwordHash, data.role],
  );

  return result.rows[0];
};

export const updateUser = async (
  id: string,
  data: { name?: string; email?: string },
): Promise<User | null> => {
  const result = await pool.query(
    `UPDATE users
     SET name = COALESCE($2, name), email = COALESCE($3, email)
     WHERE id = $1
     RETURNING id, name, email, password_hash AS "passwordHash", role, is_active AS "isActive", created_at AS "createdAt"`,
    [id, data.name ?? null, data.email ?? null],
  );

  return result.rows[0] ?? null;
};

export const setUserActive = async (id: string, isActive: boolean): Promise<User | null> => {
  const result = await pool.query(
    `UPDATE users
     SET is_active = $2
     WHERE id = $1
     RETURNING id, name, email, password_hash AS "passwordHash", role, is_active AS "isActive", created_at AS "createdAt"`,
    [id, isActive],
  );

  return result.rows[0] ?? null;
};