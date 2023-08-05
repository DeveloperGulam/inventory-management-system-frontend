import axios from 'axios';

const BASE_URL = 'https://weak-red-bear-tam.cyclic.app/api/inventory';

const getBearerToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getBearerToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllInventory = async () => {
  const response = await axiosInstance.get(BASE_URL);
  console.log('ttttt', response)
  return response.data;
};

export const createInventory = async (inventoryData) => {
  const response = await axiosInstance.post(BASE_URL, inventoryData);
  return response.data;
};

export const updateInventory = async (itemId, inventoryData) => {
  const response = await axiosInstance.patch(`${BASE_URL}/${itemId}`, inventoryData);
  return response.data;
};

export const deleteInventory = async (itemId) => {
  const response = await axiosInstance.delete(`${BASE_URL}/${itemId}`);
  return response.data;
};