import axios from "axios";
import { API_CONFIG } from "@/config";
import { getAuthToken } from "@/guards/AuthGuard";
import { mapUnknownToAppError } from "./mapAxiosError";
import { notifyUnauthorized } from "./unauthorizedSession";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      notifyUnauthorized();
    }
    return Promise.reject(mapUnknownToAppError(error));
  },
);
