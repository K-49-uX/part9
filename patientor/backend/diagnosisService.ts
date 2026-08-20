import diagnoseEntries from './data/diagnoses.js';
import type { Diagnosis } from './types.js';

const getEntries = (): Diagnosis[] => {
  return diagnoseEntries;
};

export default {
  getEntries,
};