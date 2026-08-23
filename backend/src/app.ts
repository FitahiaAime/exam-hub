import cors from 'cors';
import express from 'express';
import type { Express, Request, Response } from 'express';

export const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Exam Hub API is running' });
});

export default app;
