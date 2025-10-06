// src/lib/api.ts
import axios from "axios";

const API_BASE_URL = "https://drop-stack-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 without full reload
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't remove token for auth endpoints
      const url = error.config?.url || "";
      const isAuthEndpoint = url.includes("/login") || url.includes("/register");
      
      if (!isAuthEndpoint) {
        console.warn("Unauthorized: token missing, invalid, or expired");
        localStorage.removeItem("token");
      }

      return Promise.reject({
        ...error,
        message: "Unauthorized. Please login again.",
        isAuthError: true,
      });
    }

    return Promise.reject(error);
  }
);

export default api;