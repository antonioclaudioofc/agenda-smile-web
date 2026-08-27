import type {
  ClientRegisterSchema,
  LoginSchema,
  RegisterSchema,
} from "../types/user";
import { api } from "./http";

export const registerUser = async (data: RegisterSchema) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirm_password, ...payload } = data;
  const response = await api.post("/accounts/register/", payload);

  return response.data;
};

export const registerClient = async (data: ClientRegisterSchema) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirm_password, ...payload } = data;
  const response = await api.post("/accounts/register-client/", payload);

  return response.data;
};

export const loginUser = async (data: LoginSchema) => {
  const response = await api.post("/token/", data);

  return response.data;
};
