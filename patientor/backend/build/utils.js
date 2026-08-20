import { NewPatientSchema } from './types.js';
const toNewPatient = (object) => {
    return NewPatientSchema.parse(object);
};
export default toNewPatient;
