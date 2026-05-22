import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { connectDatabase } from './config/database';
import './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const sendList = (items: unknown[]) => ({ count: items.length, results: items });

app.get('/api/users/', (_req: Request, res: Response) => {
  res.json(sendList([{ id: 'u1', name: 'Mona Octocat', team: 'Team Alpha' }]));
});

app.get('/api/teams/', (_req: Request, res: Response) => {
  res.json(sendList([{ id: 't1', name: 'Team Alpha' }]));
});

app.get('/api/activities/', (_req: Request, res: Response) => {
  res.json(sendList([{ id: 'a1', user: 'Mona Octocat', type: 'Run', minutes: 30 }]));
});

app.get('/api/leaderboard/', (_req: Request, res: Response) => {
  res.json(sendList([{ id: 'l1', user: 'Mona Octocat', points: 90 }]));
});

app.get('/api/workouts/', (_req: Request, res: Response) => {
  res.json(sendList([{ id: 'w1', title: 'Daily cardio', difficulty: 'medium' }]));
});

app.get('/api/base-url', (_req: Request, res: Response) => {
  res.json({ baseUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to database', error);
    process.exit(1);
  });
