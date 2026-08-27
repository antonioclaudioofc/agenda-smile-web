import { z } from "zod";

export const userRegisterSchema = z
  .object({
    first_name: z.string().min(3, "Nome muito curto"),
    username: z.string().min(3, "Usuário muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha muito curta"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Senhas não coincidem",
    path: ["confirm_password"],
  });

export const userLoginSchema = z.object({
  username: z.string("Nome de usuário obrigatório"),
  password: z.string("Senha obrigatório"),
});

export const clientRegisterSchema = z
  .object({
    name: z.string().optional(),
    cpf: z.string().min(11, "CPF inválido"),
    phone: z.string().optional(),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    password: z.string().min(6, "Senha muito curta"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Senhas não coincidem",
    path: ["confirm_password"],
  });
