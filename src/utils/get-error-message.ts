import { AxiosError } from "axios";

interface ApiError {
  detail?: string;
  message?: string;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError;

    return data?.detail || data?.message || error.message || "Erro inesperado";
  }

  return "Erro inesperado";
}
