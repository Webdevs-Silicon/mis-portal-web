import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://siliconapis.com/TestBank/MISPortal_Dev/MISPortalRequestHandler.php",
  timeout: 15000,
});

const TOKEN_STORAGE_KEY = "user_token_no";

// Functions to manage token
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
};

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (config.params) {
    config.params = {
      ...config.params,
      TokenNo: token,
      MobileNo: "",
    };
  } else {
    config.params = {
      TokenNo: token,
    };
  }

  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
