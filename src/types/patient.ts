import { z } from "zod";
import type { patientSchema } from "../schemas/patient.schema";

export type PatientSchema = z.infer<typeof patientSchema>;
