import type { Service } from "../types";
import { api } from "./index";

export const getServices = async () => {
  const response = await api.get("/service");
  return response.data;
};

export const getServiceById = async (id: number) => {
  const response = await api.get(`/service/${id}`);
  return response.data;
};

export const createService = async (service: Service) => {
  const response = await api.post("/service", service);
  return response.data;
};

export const updateService = async (id: number, service: Service) => {
  await api.put(`/service/${id}`, service);
};
