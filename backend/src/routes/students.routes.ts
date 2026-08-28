import { Router } from 'express';
import {
  activateStudentController,
  createStudentController,
  deactivateStudentController,
  getStudentController,
  listStudentsController,
  updateStudentController,
} from '../controllers/StudentController.js';
import { authMiddleware } from '../security/authMiddleware.js';
import { requireRole } from '../security/roleMiddleware.js';

export const studentsRouter = Router();

studentsRouter.use(authMiddleware, requireRole('admin'));

studentsRouter.get('/', listStudentsController);
studentsRouter.get('/:id', getStudentController);
studentsRouter.post('/', createStudentController);
studentsRouter.put('/:id', updateStudentController);
studentsRouter.delete('/:id', deactivateStudentController);
studentsRouter.patch('/:id/activate', activateStudentController);
