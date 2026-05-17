import { z } from "zod";

export const appointmentSchema = z.object({
  patient: z.string().min(1, "Selecione um paciente"),
  dentist: z.string().min(1, "Selecione um dentista"),
  date: z.string().min(1, "Selecione uma data"),
  start_time: z.string().min(1, "Horário inicial é obrigatório"),
  end_time: z.string().min(1, "Horário final é obrigatório"),
  status: z.enum(["scheduled", "completed", "canceled"]),
  notes: z.string().optional(),
});
