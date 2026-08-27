import { z } from "zod";
import type {
  clientRegisterSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../schemas/user.schema";

export type RegisterSchema = z.infer<typeof userRegisterSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;
export type ClientRegisterSchema = z.infer<typeof clientRegisterSchema>;

export type Role = "secretary" | "client";
