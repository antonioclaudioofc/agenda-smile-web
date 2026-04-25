import { z } from "zod";
import type { userRegisterSchema } from "../schemas/user.schema";

export type RegisterSchema = z.infer<typeof userRegisterSchema>;
