import { z } from "zod";

export const dentistSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  specialty: z.string().optional(),
  start_time: z.string().min(1, "Início obrigatório"),
  end_time: z.string().min(1, "Fim obrigatório"),
  user: z.string().optional(),
});
