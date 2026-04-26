import axios, { AxiosError } from "axios";
import { decodeJwt } from "jose";

const TOKEN = "access_token";
const API = import.meta.env.VITE_API_BASE;

export const api = axios.create({
  baseURL: API,
});

type JwtPayload = {
  exp?: number;
};

function getValidToken(): string | null {
  const token = localStorage.getItem(TOKEN);
  if (!token) return null;

  try {
    const decoded = decodeJwt(token) as JwtPayload;

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem(TOKEN);
      return null;
    }
  } catch {
    localStorage.removeItem(TOKEN);
    return null;
  }

  return token;
}

api.interceptors.request.use((config) => {
  const token = getValidToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN);

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
