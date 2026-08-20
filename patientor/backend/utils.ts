import { NewPatientSchema, type NewPatient } from './types.js';

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default toNewPatient;