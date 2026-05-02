import axios, { AxiosError } from "axios";

const TOKEN = "access_token";
const API = import.meta.env.VITE_API_BASE;

export const api = axios.create({
  baseURL: API,
});

function getValidToken(): string | null {
  return localStorage.getItem(TOKEN);
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
