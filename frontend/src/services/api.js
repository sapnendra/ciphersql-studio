import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('css_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('css_token');
      localStorage.removeItem('css_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ─────────────────────────────────────────────────────
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ─── Assignments ─────────────────────────────────────────────
export const assignmentAPI = {
  getAll: (params) => api.get('/assignments', { params }),
  getById: (id) => api.get(`/assignments/${id}`),
};

// ─── Query ───────────────────────────────────────────────────
export const queryAPI = {
  execute: (data) => api.post('/query/execute', data),
};

// ─── Hint ────────────────────────────────────────────────────
export const hintAPI = {
  getHint: (data) => api.post('/hint', data),
};

// ─── Progress ────────────────────────────────────────────────
export const progressAPI = {
  save: (data) => api.post('/progress', data),
  getByAssignment: (assignmentId) => api.get(`/progress/${assignmentId}`),
  getAll: () => api.get('/progress'),
};

export default api;
