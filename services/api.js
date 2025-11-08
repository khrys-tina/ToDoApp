import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5220",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// ---- готові функції:
export const authApi = {
  login: (username, password) => api.post("/api/auth/login", { username, password }),
  register: (username, password) => api.post("/api/auth/register", { username, password }),
};

export const categoryApi = {
  getAll: () => api.get("/api/category"),
};

export const taskApi = {
  get: ({ page = 1, pageSize = 10, search = "", categoryId = null }) =>
    api.get("/api/task", {
      params: {
        page,
        pageSize,
        searchTerm: search || undefined,
        categoryId: categoryId || undefined,
      },
    }),
  create: (payload) => api.post("/api/task", payload),
  update: (id, payload) => api.put(`/api/task/${id}`, payload),
  remove: (id) => api.delete(`/api/task/${id}`),
};
