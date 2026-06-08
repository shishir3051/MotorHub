// client/src/api/axiosInstance.js
import axios from 'axios';
import { getActiveToken } from '../utils/session';

const API_BASE_URL = import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || '/api');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = config.sessionToken ?? getActiveToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      error.isAuthError = true;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
