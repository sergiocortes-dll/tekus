import type { Provider } from "../types";
import { api } from "./index";

export const getProviders = async () => {
  const response = await api.get("/api/provider");
  return response.data;
};

export const getProviderById = async (id: number) => {
  const response = await api.get(`/api/provider/${id}`);
  return response.data;
};

export const createProvider = async (provider: Provider) => {
  const response = await api.post("/api/provider", provider);
  return response.data;
};

export const updateProvider = async (id: number, provider: Provider) => {
  await api.put(`/api/provider/${id}`, provider);
};
