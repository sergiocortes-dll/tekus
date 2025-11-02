import axios from "axios";
export * from './country';
export * from './provider';
export * from './service';

export const api = axios.create({
  baseURL: "http://localhost:5290/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
)
