import axios from 'axios';
import { Record } from '../types';

// move to env variables or config file
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchRecords = async (): Promise<Record[]> => {
  const response = await api.get('/records');
  return response.data as Record[];
};

export const addRecord = async (formData: {
  name: string;
  gender: string;
  duration: number;
  date: string;
}) => {
  const response = await api.post('/records', {
    ...formData,
  });
  return response.data;
};
