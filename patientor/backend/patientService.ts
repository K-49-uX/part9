import patientEntries from './data/patients.ts';
import type { Patient, NonSensitivePatient } from './types.ts';

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};