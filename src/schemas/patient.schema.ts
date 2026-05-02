import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  cpf: z.string().min(11, "CPF inválido"),
  phone: z.string().min(11, "Telefone inválido"),
  notes: z.string().optional(),
  user: z.string().optional(),
});
