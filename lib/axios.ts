import axios from "axios";

// Lấy token từ cookie
function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// Lưu token vào cookie
function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

const api = axios.create({
  baseURL: "http://160.187.1.18:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request: tự động gắn accessToken
api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: tự động refresh token nếu 401
let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) {
        isRefreshing = false;
        processQueue(null, null);
        // Xóa token nếu cần
        setCookie("accessToken", "", -1);
        setCookie("refreshToken", "", -1);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/Auth/refresh-token",
          { refreshToken }
        );
        const { accessToken, refreshToken: newRefreshToken } = res.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", newRefreshToken);
        api.defaults.headers.common.Authorization = "Bearer " + accessToken;
        processQueue(null, accessToken);
        originalRequest.headers.Authorization = "Bearer " + accessToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        setCookie("accessToken", "", -1);
        setCookie("refreshToken", "", -1);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
