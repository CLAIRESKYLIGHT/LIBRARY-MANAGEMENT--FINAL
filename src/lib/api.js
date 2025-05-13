import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints for dashboard
export const dashboardApi = {
  getStats: () => api.get("/dashboard/stats"),
  getRecentBorrowings: () => api.get("/dashboard/recent-borrowings"),
  getPopularBooks: () => api.get("/dashboard/popular-books"),
};

export default api;
