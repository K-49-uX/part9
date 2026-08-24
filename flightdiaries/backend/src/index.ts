import express from 'express';
import cors from 'cors'; // <-- Add this
import diaryRouter from './routes/diaries.ts';

const app = express();
app.use(cors()); // <-- Add this right before express.json()
app.use(express.json());

const PORT = 3000;

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});