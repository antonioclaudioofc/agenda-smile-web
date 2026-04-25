import { z } from "zod";

export const userRegisterSchema = z
  .object({
    first_name: z.string().min(2, "Nome muito curto"),

    username: z
      .string()
      .min(3, "Nome de usuário muito curto")
      .regex(/^\S+$/, "Usuário não pode conter espaços"),

    email: z.email("Email inválido"),

    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
