// src/lib/api.ts
import axios from "axios";
import { startLoading, stopLoading } from "@/contexts/LoadingContextInstance";

export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

export const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

let activeRequests = 0;

api.interceptors.request.use((config) => {
  if (activeRequests === 0) startLoading(); // liga o loading
  activeRequests++;
  return config;
});

api.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) stopLoading(); // desliga quando todas terminam
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) stopLoading();
    return Promise.reject(error);
  }
);
