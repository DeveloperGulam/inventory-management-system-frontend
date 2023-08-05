import axios from 'axios';

const BASE_URL = 'https://weak-red-bear-tam.cyclic.app/api/auth';

export const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data;
};