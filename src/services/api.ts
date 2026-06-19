import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is missing in .env file");
}

let isRedirectingToLogin = false;

const api = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && !isRedirectingToLogin) {
      isRedirectingToLogin = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("allUser");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;