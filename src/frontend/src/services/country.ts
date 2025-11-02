import type { Country } from "../types";
import { api } from "./index";

export const getCountries = async () => {
  const response = await api.get("/country");
  return response.data;
};

export const getCountryById = async (id: number) => {
  const response = await api.get(`/country/${id}`);
  return response.data;
};

export const createCountry = async (country: Country) => {
  const response = await api.post("/country", country);
  return response.data;
};

export const updateCountry = async (id: number, country: Country) => {
  await api.put(`/country/${id}`, country);
};
