import { NewPatientSchema, type NewPatient } from './types.ts';

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default toNewPatient;