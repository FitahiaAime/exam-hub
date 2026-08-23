import cors from 'cors';
import express from 'express';
import type { Express, Request, Response } from 'express';
import { authRouter } from './routes/auth.routes.js';
import { studentsRouter } from './routes/students.routes.js';

export const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Exam Hub API is running' });
});

export default app;
