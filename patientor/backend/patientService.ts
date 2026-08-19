import patientData from './data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient } from './types.ts';

const patients: Patient[] = patientData as Patient[];

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: String(Math.round(Math.random() * 1000000)),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
};