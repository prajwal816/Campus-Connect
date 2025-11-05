import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://campuseventhub-api.onrender.com/api"
    : "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true  // Important for CORS with credentials
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
