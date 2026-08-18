import express, { type Response } from 'express';
import type { Diagnosis } from '../types.ts';
import diagnosisService from '../diagnosisService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;