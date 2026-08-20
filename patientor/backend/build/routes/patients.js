import express from 'express';
import patientService from '../patientService.js';
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
        const newPatientEntry = req.body;
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;
