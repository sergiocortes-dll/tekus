import type { Service, PaginationParams, PagedServicesResponse } from "../types";
import { api } from "./index";

export async function getServices(params?: PaginationParams): Promise<PagedServicesResponse> {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const { data } = await api.get(`/service?${query}`);
    return data as PagedServicesResponse;
}

export const getServiceById = async (id: number) => {
  const response = await api.get(`/service/${id}`);
  return response.data;
};

export const createService = async (service: Service) => {

  const payload = {
    name: service.name,
    hourlyRateUSD: service.hourlyRateUSD,
    providerId: service.providerId,
    countries: service.countries
  };

  const response = await api.post("/service", payload);
  return response.data;
};

export const updateService = async (id: number, service: Service) => {
  const payload = {
    name: service.name,
    hourlyRateUSD: service.hourlyRateUSD,
    providerId: service.providerId,
    countries: service.countries
  };

  await api.put(`/service/${id}`, payload);
};
