import axios from "axios";
import type { Provider } from "../types";

const api = axios.create({
  baseURL: "http://localhost:5290",
});

api.interceptors.request.use((config) => {
  config.headers["User"] = "admin";
  config.headers["Pass"] = "123";
  return config;
})

export const getProviders = async () => {
  const response = await api.get("/providers");
  return response.data;
}

export const getProviderId = async (id: number) => {
  const response = await api.get(`/providers/${id}`);
  return response.data;
}

export const createProvider = async (provider: Provider) => {
  const response = await api.post("/providers", provider);
  return response.data;
}

export const updateProvider = async (id: number, provider: Provider) => {
  await api.put(`/providers/${id}`, provider);
}
