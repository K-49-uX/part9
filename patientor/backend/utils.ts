import { Patient, Gender, HealthCheckRating } from './types.js';
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

// Base schema for shared entry fields
const baseEntrySchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  specialist: z.string().min(1, { message: "Specialist is required" }),
  diagnosisCodes: z.array(z.string()).optional(),
});

// Specific schemas for each entry type
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().min(1, { message: "Discharge date is required" }),
    criteria: z.string().min(1, { message: "Discharge criteria is required" }),
  }),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, { message: "Employer name is required" }),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});

// Combined schema using discriminated union on the 'type' field
export const newEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

const toNewPatient = (object: unknown): Omit<Patient, 'id'> => {
  const parsedData = NewPatientSchema.parse(object);
  return {
    ...parsedData,
    entries: []
  };
};

export default toNewPatient;