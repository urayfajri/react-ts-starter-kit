import axios from "axios";
import { API_CONFIG } from "@/config";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
