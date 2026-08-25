import patientsData from './data/patients.js';
import { Patient, Entry, NewEntry } from './types.js';
import { v1 as uuidv1 } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patientsData.find(p => p.id === id);
  return patient;
};

const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatientId = uuidv1();
  const newPatient: Patient = {
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

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = findById(patientId);
  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
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