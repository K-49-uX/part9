import { Gender } from './types.js';
import { z } from 'zod';
export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.any()), // or your entry validation schema
});
const toNewPatient = (object) => {
    return NewPatientSchema.parse(object);
};
export default toNewPatient;
