import express, { type Response } from 'express';
import type { Diagnosis } from '../types.js';
import diagnosisService from '../diagnosisService.js';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;