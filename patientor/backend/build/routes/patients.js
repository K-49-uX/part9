import express from 'express';
import patientService from '../patientService.js';
import toNewPatient, { newEntrySchema } from '../utils.js';
const router = express.Router();
router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const patient = patientService.findById(id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404).send({ error: 'Patient not found' });
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        // Validate request body using our Zod schema
        const newEntry = newEntrySchema.parse(req.body);
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const addedEntry = patientService.addEntry(id, newEntry);
        if (addedEntry) {
            res.json(addedEntry);
        }
        else {
            res.status(404).send({ error: 'Patient not found' });
        }
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});
export default router;
