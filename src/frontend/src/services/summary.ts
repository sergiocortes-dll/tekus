import { api } from ".";

export const getSummary = async () => {
  const response = await api.get("/summary");
  return response.data;
}
