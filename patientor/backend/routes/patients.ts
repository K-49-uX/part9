import express, { Request, Response } from 'express';
import patientService from '../patientService.js';
import { NewPatientSchema, Patient, NewEntry } from '../types.js';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const patient: Patient | undefined = patientService.findById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientEntry = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const newEntry = req.body as NewEntry;

    const addedEntry = patientService.addEntry(id, newEntry);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;