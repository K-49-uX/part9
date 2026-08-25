import { Gender } from './types.js';
import { z } from 'zod';
export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});
const toNewPatient = (object) => {
    const parsedData = NewPatientSchema.parse(object);
    return {
        ...parsedData,
        entries: []
    };
};
export default toNewPatient;
