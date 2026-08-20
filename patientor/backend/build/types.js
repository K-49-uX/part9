import { z } from 'zod';
export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other',
};
export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.unknown()).default([])
});
