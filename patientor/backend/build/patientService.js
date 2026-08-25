import patientsData from './data/patients.js';
import { v1 as uuidv1 } from 'uuid';
const getPatients = () => {
    return patientsData;
};
const getNonSensitivePatients = () => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const findById = (id) => {
    const patient = patientsData.find(p => p.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newPatientId = uuidv1();
    const newPatient = {
        id: newPatientId,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        ssn: patient.ssn,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries ?? []
    };
    patientsData.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const patient = findById(patientId);
    if (!patient) {
        return undefined;
    }
    const newEntry = {
        id: uuidv1(),
        ...entry
    };
    patient.entries.push(newEntry);
    return newEntry;
};
export default {
    getPatients,
    getNonSensitivePatients,
    findById,
    addPatient,
    addEntry
};
