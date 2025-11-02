import axios from "axios";
export * from './country';
export * from './provider';
export * from './service';

export const api = axios.create({
  baseURL: "http://localhost:5290",
});

api.interceptors.request.use((config) => {
  config.headers["User"] = "admin";
  config.headers["Password"] = "123";
  return config;
});
