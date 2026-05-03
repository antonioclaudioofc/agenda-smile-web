import type { z } from "zod";
import type { dentistSchema } from "../schemas/dentist.schema";

export type DentistSchema = z.infer<typeof dentistSchema>;
