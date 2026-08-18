import rawPatientEntries from './data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient } from './types.ts';
import { v1 as uuid } from 'uuid';

const patientEntries: Patient[] = (rawPatientEntries as Array<Omit<Patient, 'entries'> & { entries: unknown[] }>).map(
  (p) => ({
    ...p,
    entries: p.entries ?? []
  })
);

const getEntries = (): Patient[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...patient,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};