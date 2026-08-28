import type { Request, Response } from 'express';
import {
  StudentError,
  createStudent,
  getStudentById,
  listStudents,
  setStudentActive,
  updateStudent,
} from '../services/StudentService.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isValidId = (req: Request, res: Response): boolean => {
  if (!UUID_REGEX.test(req.params.id)) {
    res.status(400).json({ message: 'Identifiant invalide' });
    return false;
  }

  return true;
};

const handleError = (error: unknown, res: Response): void => {
  if (error instanceof StudentError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: 'Erreur serveur' });
};

export const listStudentsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const students = await listStudents();
    res.status(200).json({ students });
  } catch (error) {
    handleError(error, res);
  }
};

export const getStudentController = async (req: Request, res: Response): Promise<void> => {
  if (!isValidId(req, res)) {
    return;
  }

  try {
    const student = await getStudentById(req.params.id);
    res.status(200).json({ student });
  } catch (error) {
    handleError(error, res);
  }
};

export const createStudentController = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Nom, email et mot de passe requis' });
    return;
  }

  try {
    const student = await createStudent({ name, email, password });
    res.status(201).json({ student });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateStudentController = async (req: Request, res: Response): Promise<void> => {
  if (!isValidId(req, res)) {
    return;
  }

  const { name, email } = req.body;

  try {
    const student = await updateStudent(req.params.id, { name, email });
    res.status(200).json({ student });
  } catch (error) {
    handleError(error, res);
  }
};

export const deactivateStudentController = async (req: Request, res: Response): Promise<void> => {
  if (!isValidId(req, res)) {
    return;
  }

  try {
    const student = await setStudentActive(req.params.id, false);
    res.status(200).json({ student });
  } catch (error) {
    handleError(error, res);
  }
};

export const activateStudentController = async (req: Request, res: Response): Promise<void> => {
  if (!isValidId(req, res)) {
    return;
  }

  try {
    const student = await setStudentActive(req.params.id, true);
    res.status(200).json({ student });
  } catch (error) {
    handleError(error, res);
  }
};
