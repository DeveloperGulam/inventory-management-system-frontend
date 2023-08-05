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

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(errorMessage);
  }
);

export const getAllInventory = async () => {
  try {
    const response = await axiosInstance.get(BASE_URL);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createInventory = async (inventoryData) => {
  try {
    const response = await axiosInstance.post(BASE_URL, inventoryData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateInventory = async (itemId, inventoryData) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/${itemId}`, inventoryData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteInventory = async (itemId) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/${itemId}`);
    return response;
  } catch (error) {
    throw error;
  }
};