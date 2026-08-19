import express, { type Request, type Response } from 'express';
import patientService from '../patientService.ts';
import toNewPatient from '../utils.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).send({ error: errorMessage });
    }
  }
});

export default router;