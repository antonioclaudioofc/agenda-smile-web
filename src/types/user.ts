import { z } from "zod";
import type {
  userLoginSchema,
  userRegisterSchema,
} from "../schemas/user.schema";

export type RegisterSchema = z.infer<typeof userRegisterSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;
