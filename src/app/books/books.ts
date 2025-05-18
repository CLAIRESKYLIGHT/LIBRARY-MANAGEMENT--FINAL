// api/books.ts
import axios from 'axios';

const API_URL = 'https://library-management-grn1.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Books API
export const booksApi = {
  // Get all books
  getAll: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  // Get single book
  getOne: async (id: number) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Create book (admin only)
  create: async (bookData: {
    title: string;
    author: string;
    isbn: string;
    published_date: string;
    description: string;
    price: number;
  }) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // Update book (admin only)
  update: async (id: number, bookData: Partial<{
    title: string;
    author: string;
    isbn: string;
    published_date: string;
    description: string;
    price: number;
    is_available: boolean;
  }>) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Delete book (admin only)
  delete: async (id: number) => {
    await api.delete(`/books/${id}`);
  },
};

// Auth API
export const authApi = {
  // Register
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  // Login
  login: async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  // Logout
  logout: async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
  },
};

// User API
export const userApi = {
  // Get profile
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (userData: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    const response = await api.put('/profile', userData);
    return response.data;
  },
};