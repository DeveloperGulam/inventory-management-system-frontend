import axios from 'axios';

const BASE_URL = 'http://localhost:8100/api/auth';

export const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data;
};