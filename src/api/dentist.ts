import { api } from "./http";
import type { DentistSchema } from "../types/dentist";

export const createDentist = async (data: DentistSchema) => {
  const response = await api.post("/dentists/", data);

  return response.data;
};

export const getDentists = async () => {
  const response = await api.get("/dentists/");

  return response.data;
};

export const updateDentist = async (id: string, data: DentistSchema) => {
  const response = await api.put(`/dentists/${id}/`, data);

  return response.data;
};

export const deleteDentist = async (id: string) => {
  const response = await api.delete(`/dentists/${id}/`);

  return response.data;
};
