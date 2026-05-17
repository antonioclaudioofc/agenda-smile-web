import type { AppointmentSchema } from "../types/appointment";
import { api } from "./http";

export const getAppointments = async () => {
  const response = await api.get("/appointments/");
  return response.data;
};

export const createAppointment = async (data: AppointmentSchema) => {
  const response = await api.post("/appointments/", data);
  return response.data;
};

export const updateAppointment = async (
  id: string,
  data: AppointmentSchema,
) => {
  const response = await api.put(`/appointments/${id}/`, data);
  return response.data;
};

export const deleteAppointment = async (id: string) => {
  const response = await api.delete(`/appointments/${id}/`);
  return response.data;
};
