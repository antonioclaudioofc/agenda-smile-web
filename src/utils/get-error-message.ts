import { AxiosError } from "axios";

function firstString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return undefined;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Record<string, unknown> | undefined;

    const detail = firstString(data?.detail);
    if (detail) return detail;

    const message = firstString(data?.message);
    if (message) return message;

    if (data && typeof data === "object") {
      for (const value of Object.values(data)) {
        const fieldMessage = firstString(value);
        if (fieldMessage) return fieldMessage;
      }
    }

    return error.message || "Erro inesperado";
  }

  return "Erro inesperado";
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof AxiosError)) return {};

  const data = error.response?.data as Record<string, unknown> | undefined;
  if (!data || typeof data !== "object") return {};

  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    if (key === "detail" || key === "message" || key === "non_field_errors") {
      continue;
    }

    const message = firstString(value);
    if (message) result[key] = message;
  }

  return result;
}
