// import axios from "axios";

// const apiClient = axios.create({
//   baseURL:
//     "https://siliconapis.com/TestBank/MISPortal_Dev/MISPortalRequestHandler.php",
//   timeout: 15000,
// });

// const TOKEN_STORAGE_KEY = "user_token_no";

// // Functions to manage token
// export const setToken = (token: string) => {
//   localStorage.setItem(TOKEN_STORAGE_KEY, token);
// };

// export const clearToken = () => {
//   localStorage.removeItem(TOKEN_STORAGE_KEY);
// };

// export const getToken = () => {
//   return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
// };

// // Request interceptor
// apiClient.interceptors.request.use((config) => {
//   const token = getToken();

//   if (config.params) {
//     config.params = {
//       ...config.params,
//       TokenNo: token,
//       // MobileNo: "",
//     };
//   } else {
//     config.params = {
//       TokenNo: token,
//     };
//   }

//   return config;
// });

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
// import axios from "axios";

// const apiClient = axios.create({
//   baseURL:
//     "https://siliconapis.com/TestBank/MISPortal_Dev/MISPortalRequestHandler.php",
//   timeout: 15000,
// });

// const TOKEN_STORAGE_KEY = "user_token_no";
// const MOBILE_STORAGE_KEY = "user_mobile_no";

// // Store token in memory for immediate access
// let currentToken = "";
// let currentMobileNumber = "";
// // Function to set mobile number (call this when user clicks login)
// export const setMobileNumber = (mobile: string) => {
//   currentMobileNumber = mobile;
//   localStorage.setItem("user_mobile", mobile); // Store for page refresh
// };

// // Initialize from localStorage on module load
// const initializeFromStorage = () => {
//   const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
//   const storedMobile = localStorage.getItem(MOBILE_STORAGE_KEY);
  
//   if (storedToken) {
//     currentToken = storedToken;
//   }
//   if (storedMobile) {
//     currentMobile = storedMobile;
//   }
// };

// // Initialize immediately
// initializeFromStorage();

// // Functions to manage token
// export const setToken = (token: string) => {
//   currentToken = token;
//   localStorage.setItem(TOKEN_STORAGE_KEY, token);
// };

// export const setMobile = (mobile: string) => {
//   currentMobile = mobile;
//   localStorage.setItem(MOBILE_STORAGE_KEY, mobile);
// };

// export const clearAuthData = () => {
//   currentToken = "";
//   currentMobile = "";
//   localStorage.removeItem(TOKEN_STORAGE_KEY);
//   localStorage.removeItem(MOBILE_STORAGE_KEY);
//   // Optional: Clear bank logo cache too
//   localStorage.removeItem("bankLogo");
// };

// export const getToken = () => {
//   return currentToken;
// };

// export const getMobile = () => {
//   return currentMobile;
// };

// export const isAuthenticated = () => {
//   return !!currentToken && !!currentMobile;
// };

// // Request interceptor to add TokenNo to all requests
// apiClient.interceptors.request.use((config) => {
//   const token = getToken();
  
//   // Add TokenNo to query params
//   if (config.params) {
//     config.params.TokenNo = token || "0"; // Use "0" if no token yet
//   } else {
//     config.params = { TokenNo: token || "0" };
//   }

//   return config;
// });

// // Response interceptor to update token from responses
// apiClient.interceptors.response.use(
//   (response) => {
//     // Check if response contains a new TokenNo
//     const newToken = response.data?.TokenNo;
    
//     if (newToken && typeof newToken === "string") {
//       // Update token in storage and memory
//       setToken(newToken);
//     }
    
//     return response;
//   },
//   (error) => {
//     console.error("API Error:", error);
    
//     // Handle token expiration or invalid token
//     if (error.response?.data?.RC === "999" || error.response?.data?.RC === 999) {
//       // Token expired or invalid
//       clearAuthData();
//       // Redirect to login page
//       if (window.location.pathname !== "/") {
//         window.location.href = "/";
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default apiClient;








import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://siliconapis.com/TestBank/MISPortal_Dev/MISPortalRequestHandler.php",
  timeout: 15000,
});

const TOKEN_STORAGE_KEY = "user_token_no";
const MOBILE_STORAGE_KEY = "user_mobile_no";

// Store token and mobile in memory
let currentToken = "";
let currentMobile = "";

// Initialize from localStorage
const initializeFromStorage = () => {
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  const storedMobile = localStorage.getItem(MOBILE_STORAGE_KEY);
  
  if (storedToken) {
    currentToken = storedToken;
  }
  if (storedMobile) {
    currentMobile = storedMobile;
  }
};

// Initialize immediately
initializeFromStorage();

// Token and mobile management functions
export const setToken = (token: string) => {
  currentToken = token;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const setMobile = (mobile: string) => {
  currentMobile = mobile;
  localStorage.setItem(MOBILE_STORAGE_KEY, mobile);
};

export const getToken = () => {
  return currentToken;
};

export const getMobile = () => {
  return currentMobile;
};

export const clearAuthData = () => {
  currentToken = "";
  currentMobile = "";
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(MOBILE_STORAGE_KEY);
  localStorage.removeItem("bankLogo");
};

export const isAuthenticated = () => {
  return !!currentToken && !!currentMobile;
};

// Request interceptor - adds TokenNo and MobileNo to ALL requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  const mobile = getMobile();
  
  // Always add TokenNo
  const params = {
    ...config.params,
    TokenNo: token || "0",
  };
  
  // Add MobileNo if we have it
  if (mobile) {
    params.MobileNo = mobile;
  }
  
  config.params = params;
  
  // Debug: Log request parameters
  console.log("📤 API Request:", {
    url: config.url,
    params: config.params
  });
  
  return config;
});

// Response interceptor - updates token from responses
apiClient.interceptors.response.use(
  (response) => {
    const newToken = response.data?.TokenNo || response.data?.Header?.TokenNo;
    const newMobile = response.data?.MobileNo;
     if (response.config.params?.RequestID === "Logo") {
      console.log("⚠️ Skipping token save for Logo request");
      return response; // Return without saving token
    }
    if(response.data?.Header?.TokenNo){
      console.log('LATEST_TOKEN_FROM_RESPONSE_HEADER',response.data.Header.TokenNo)

    }
    
    // Update token if received
    if (newToken && typeof newToken === "string") {
      setToken(newToken);
    }
    
    // Update mobile if received
    if (newMobile && typeof newMobile === "string") {
      setMobile(newMobile);
    }
    
    console.log("📥 API Response:", {
      data: response.data,
      newToken,
      newMobile
    });
    
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    
    // Handle token expiration
    if (error.response?.data?.RC === "999" || error.response?.data?.RC === 999) {
      clearAuthData();
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

// import axios, {type InternalAxiosRequestConfig } from "axios";

// // Debug configuration
// const DEBUG = true; // Set to false in production
// const DEBUG_LEVEL = "detailed" as "basic" | "detailed" | "verbose"; // Type assertion

// const apiClient = axios.create({
//   baseURL:
//     "https://siliconapis.com/TestBank/MISPortal_Dev/MISPortalRequestHandler.php",
//   timeout: 15000,
// });

// const TOKEN_STORAGE_KEY = "user_token_no";
// const MOBILE_STORAGE_KEY = "user_mobile_no";

// // Store token and mobile in memory
// let currentToken = "";
// let currentMobile = "";

// // Custom interface to add metadata property
// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   metadata?: {
//     startTime?: number;
//   };
// }

// // Initialize from localStorage
// const initializeFromStorage = () => {
//   const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
//   const storedMobile = localStorage.getItem(MOBILE_STORAGE_KEY);
  
//   if (storedToken) {
//     currentToken = storedToken;
//   }
//   if (storedMobile) {
//     currentMobile = storedMobile;
//   }
  
//   if (DEBUG) {
//     console.group("🔍 API Client Initialization");
//     console.log("📱 Mobile from storage:", currentMobile ? `+91 ${currentMobile}` : "Not found");
//     console.log("🔑 Token from storage:", currentToken ? `${currentToken.substring(0, 15)}...` : "Not found");
//     console.groupEnd();
//   }
// };

// // Initialize immediately
// initializeFromStorage();

// // Token and mobile management functions
// export const setToken = (token: string) => {
//   currentToken = token;
//   localStorage.setItem(TOKEN_STORAGE_KEY, token);
  
//   if (DEBUG) {
//     console.group("🔑 Token Updated");
//     console.log("New Token:", `${token.substring(0, 15)}...`);
//     console.log("Full Token:", token);
//     console.groupEnd();
//   }
// };

// export const setMobile = (mobile: string) => {
//   currentMobile = mobile;
//   localStorage.setItem(MOBILE_STORAGE_KEY, mobile);
  
//   if (DEBUG) {
//     console.group("📱 Mobile Number Updated");
//     console.log("New Mobile:", `+91 ${mobile}`);
//     console.groupEnd();
//   }
// };

// export const getToken = () => {
//   return currentToken;
// };

// export const getMobile = () => {
//   return currentMobile;
// };

// export const clearAuthData = () => {
//   if (DEBUG) {
//     console.group("🧹 Clearing Auth Data");
//     console.log("Old Token:", currentToken ? `${currentToken.substring(0, 15)}...` : "None");
//     console.log("Old Mobile:", currentMobile ? `+91 ${currentMobile}` : "None");
//     console.groupEnd();
//   }
  
//   currentToken = "";
//   currentMobile = "";
//   localStorage.removeItem(TOKEN_STORAGE_KEY);
//   localStorage.removeItem(MOBILE_STORAGE_KEY);
//   localStorage.removeItem("bankLogo");
// };

// export const isAuthenticated = () => {
//   const authenticated = !!currentToken && !!currentMobile;
  
//   if (DEBUG) {
//     console.group("🔐 Authentication Check");
//     console.log("Has Token:", !!currentToken);
//     console.log("Has Mobile:", !!currentMobile);
//     console.log("Is Authenticated:", authenticated);
//     console.groupEnd();
//   }
  
//   return authenticated;
// };

// // Colorful console output helpers
// const styles = {
//   request: "background: #4CAF50; color: white; padding: 2px 6px; border-radius: 3px;",
//   response: "background: #2196F3; color: white; padding: 2px 6px; border-radius: 3px;",
//   success: "background: #8BC34A; color: white; padding: 2px 6px; border-radius: 3px;",
//   error: "background: #F44336; color: white; padding: 2px 6px; border-radius: 3px;",
//   warning: "background: #FF9800; color: white; padding: 2px 6px; border-radius: 3px;",
//   info: "background: #00BCD4; color: white; padding: 2px 6px; border-radius: 3px;"
// };

// // Request interceptor - adds TokenNo and MobileNo to ALL requests
// apiClient.interceptors.request.use((config: CustomAxiosRequestConfig) => {
//   const token = getToken();
//   const mobile = getMobile();
  
//   // Always add TokenNo
//   const params = {
//     ...config.params,
//     TokenNo: token || "0",
//   };
  
//   // Add MobileNo if we have it
//   if (mobile) {
//     params.MobileNo = mobile;
//   }
  
//   config.params = params;
  
//   // Store start time for performance measurement
//   config.metadata = { startTime: Date.now() };
  
//   // Enhanced Debugging
//   if (DEBUG) {
//     const requestId = config.params?.RequestID || "Unknown";
//     const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    
//     console.groupCollapsed(`%c📤 ${requestId} Request ${timestamp}`, styles.request);
    
//     console.log("%c🌐 URL:", styles.info, config.url);
//     console.log("%c⚙️ Method:", styles.info, config.method?.toUpperCase());
    
//     console.group("%c📋 Request Parameters:", styles.info);
//     Object.entries(config.params || {}).forEach(([key, value]) => {
//       if (key === "TokenNo" && value && typeof value === "string") {
//         console.log(`  ${key}:`, `${(value as string).substring(0, 15)}...`);
//       } else {
//         console.log(`  ${key}:`, value);
//       }
//     });
//     console.groupEnd();
    
//     console.log("%c🔑 Current Token:", styles.warning, 
//       token ? `${token.substring(0, 15)}...` : "Not set");
//     console.log("%c📱 Current Mobile:", styles.warning, 
//       mobile ? `+91 ${mobile}` : "Not set");
    
//     if (DEBUG_LEVEL === "verbose" && config.data) {
//       console.group("%c📦 Request Body:", styles.info);
//       console.log(JSON.stringify(config.data, null, 2));
//       console.groupEnd();
//     }
    
//     console.groupEnd();
//   }
  
//   return config;
// });

// // Response interceptor - updates token from responses
// apiClient.interceptors.response.use(
//   (response) => {
//     const newToken = response.data?.TokenNo;
//     const newMobile = response.data?.MobileNo;
//     const rc = response.data?.RC;
//     const requestId = response.config.params?.RequestID || "Unknown";
//     const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
//     const config = response.config as CustomAxiosRequestConfig;
    
//     // Update token if received
//     if (newToken && typeof newToken === "string") {
//       setToken(newToken);
//     }
    
//     // Update mobile if received
//     if (newMobile && typeof newMobile === "string") {
//       setMobile(newMobile);
//     }
    
//     // Enhanced Debugging
//     if (DEBUG) {
//       const isSuccess = rc === 0 || rc === "0";
//       const statusStyle = isSuccess ? styles.success : styles.error;
//       const statusIcon = isSuccess ? "✅" : "❌";
      
//       console.groupCollapsed(`%c${statusIcon} ${requestId} Response ${timestamp}`, statusStyle);
      
//       console.log("%c📊 Response Code:", styles.info, rc);
//       console.log("%c💬 Message:", styles.info, response.data?.Message || "No message");
      
//       if (newToken) {
//         console.log("%c🔄 New Token:", styles.warning, `${newToken.substring(0, 15)}...`);
//       }
      
//       if (newMobile) {
//         console.log("%c📱 New Mobile:", styles.warning, newMobile);
//       }
      
//       console.group("%c📦 Response Data:", styles.info);
//       console.log(JSON.stringify(response.data, null, 2));
//       console.groupEnd();
      
//       if (DEBUG_LEVEL === "detailed" || DEBUG_LEVEL === "verbose") {
//         console.group("%c🔧 Response Headers:", styles.info);
//         console.log(response.headers);
//         console.groupEnd();
        
//         console.log("%c⏱️ Response Time:", styles.info, 
//           `${Date.now() - (config.metadata?.startTime || Date.now())}ms`);
//       }
      
//       console.groupEnd();
//     }
    
//     return response;
//   },
//   (error) => {
//     const requestId = error.config?.params?.RequestID || "Unknown";
//     const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    
//     console.group(`%c❌ ${requestId} Error ${timestamp}`, styles.error);
    
//     console.log("%c🔴 Error Status:", styles.error, error.response?.status || "No status");
//     console.log("%c📝 Error Message:", styles.error, error.message);
    
//     if (error.response) {
//       console.group("%c📦 Error Response Data:", styles.error);
//       console.log(JSON.stringify(error.response.data, null, 2));
//       console.groupEnd();
      
//       console.log("%c🔧 Error Headers:", styles.error, error.response.headers);
//     }
    
//     if (error.config) {
//       console.group("%c📤 Failed Request Config:", styles.warning);
//       console.log("URL:", error.config.url);
//       console.log("Method:", error.config.method?.toUpperCase());
//       console.log("Params:", error.config.params);
//       console.groupEnd();
//     }
    
//     if (error.stack) {
//       console.log("%c🔍 Stack Trace:", styles.warning, error.stack);
//     }
    
//     console.groupEnd();
    
//     // Handle token expiration
//     if (error.response?.data?.RC === "999" || error.response?.data?.RC === 999) {
//       console.group("%c⚠️ Token Expired - Clearing Auth", styles.warning);
//       console.log("Redirecting to login...");
//       console.groupEnd();
      
//       clearAuthData();
//       if (window.location.pathname !== "/") {
//         window.location.href = "/";
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Log API client status on startup
// if (DEBUG) {
//   console.log("%c🚀 API Client Initialized", "background: #673AB7; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;");
//   console.log("Base URL:", apiClient.defaults.baseURL);
//   console.log("Debug Level:", DEBUG_LEVEL);
//   console.log("Current Mobile:", getMobile() ? `+91 ${getMobile()}` : "Not set");
//   console.log("Current Token:", getToken() ? `${getToken().substring(0, 15)}...` : "Not set");
// }

// export default apiClient;