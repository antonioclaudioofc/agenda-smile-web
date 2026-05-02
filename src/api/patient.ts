import type { PatientSchema } from "../types/patient";
import { api } from "./http";

export const createPatient = async (data: PatientSchema) => {
  const response = await api.post("/patients/", data);

  return response.data;
};

export const getPatients = async () => {
  const response = await api.get("/patients/");

  return response.data;
};

export const updatePatient = async (id: string, data: PatientSchema) => {
  const response = await api.put(`/patients/${id}/`, data);

  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await api.delete(`/patients/${id}/`);

  return response.data;
};
