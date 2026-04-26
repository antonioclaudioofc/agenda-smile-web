import type { LoginSchema, RegisterSchema } from "../types/user";
import { api } from "./http";

export const registerUser = async (data: RegisterSchema) => {
  const response = await api.post("/accounts/register", data);

  return response.data;
};

export const loginUser = async (data: LoginSchema) => {
  const response = await api.post("/token", data);

  return response.data;
};
