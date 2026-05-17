import { z } from "zod";
import { appointmentSchema } from "../schemas/appointment.schema";

export type AppointmentSchema = z.infer<typeof appointmentSchema>;

export interface Appointment extends AppointmentSchema {
  id: string;
  patient_name?: string;
  dentist_name?: string;
  created_at: string;
  updated_at: string;
}
