import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses.ts';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/', (_req, res) => {
  res.send('Patientor backend is running!');
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// Use the diagnoses router
app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});