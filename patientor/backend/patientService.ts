import patientData from "./data/patients.js";
import { Patient, NonSensitivePatient, NewPatientEntry } from "./types.js";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries: entries || [],
    }),
  );
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p: Patient) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry: Patient = {
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
