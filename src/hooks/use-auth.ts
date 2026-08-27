import { useMutation } from "@tanstack/react-query";
import { loginUser, registerClient, registerUser } from "../api/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useRegisterClient = () => {
  return useMutation({
    mutationFn: registerClient,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
