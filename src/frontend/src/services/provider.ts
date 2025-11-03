import type { Provider, PaginationParams, PagedProvidersResponse } from "../types";

import { api } from "./index";

export async function getProviders(params?: PaginationParams): Promise<PagedProvidersResponse> {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const { data } = await api.get(`/provider?${query}`);
    return data as PagedProvidersResponse;
}

export const getAllProviders = async () => {
  const response = await api.get("/provider/all");
  return response.data;
};

export const getProviderById = async (id: number) => {
  const response = await api.get(`/provider/${id}`);
  return response.data;
};

export const createProvider = async (provider: Provider) => {
  const response = await api.post("/provider", provider);
  return response.data;
};

export const updateProvider = async (id: number, provider: Provider) => {
  await api.put(`/provider/${id}`, provider);
};
