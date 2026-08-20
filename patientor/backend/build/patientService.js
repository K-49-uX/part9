import patientData from "./data/patients.js";
import { v1 as uuid } from "uuid";
const patients = patientData;
const getEntries = () => {
    return patients;
};
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: entries || [],
    }));
};
const findById = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};
const addPatient = (entry) => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry,
        entries: entry.entries || [],
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
export default {
    getEntries,
    getNonSensitivePatients,
    findById,
    addPatient,
};
