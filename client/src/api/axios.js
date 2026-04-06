import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔥 Injected from React
let showLoader;
let hideLoader;

export const setLoader = (loaderFunctions) => {
  showLoader = loaderFunctions.showLoader;
  hideLoader = loaderFunctions.hideLoader;
};

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    // 🔐 Attach token
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    // 🔄 Start loader
    if (!req.headers["x-skip-loader"] && showLoader) {
      showLoader();
    }

    return req;
  },
  (error) => {
    if (hideLoader) hideLoader();
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => {
    // 🔄 Stop loader
    if (!res.config.headers["x-skip-loader"] && hideLoader) {
      hideLoader();
    }
    return res;
  },
  (error) => {
    // 🔄 Stop loader on error
    if (!error.config?.headers["x-skip-loader"] && hideLoader) {
      hideLoader();
    }

    // 🔐 Optional: auto logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
