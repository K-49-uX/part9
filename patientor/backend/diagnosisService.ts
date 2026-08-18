import diagnoseEntries from './data/diagnoses.ts';
import type { Diagnosis } from './types.ts';

const getEntries = (): Diagnosis[] => {
  return diagnoseEntries;
};

export default {
  getEntries,
};