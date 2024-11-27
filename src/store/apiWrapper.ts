import axios from 'axios';
import auth from '../utils/auth';

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors remain the same
baseApi.interceptors.request.use(
  (config) => {
    const token_access = auth.getToken();
    if (token_access) {
      config.headers.Authorization = `Bearer ${token_access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default baseApi;
