import axios from 'axios';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/patients`);
  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: Record<string, unknown>) => {
  const { data } = await axios.post(`${apiBaseUrl}/patients`, object);
  return data;
};

const addEntry = async (id: string, object: Record<string, unknown>) => {
  const { data } = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, object);
  return data;
};

export default { getAll, getOne, create, addEntry };