import axios from 'axios';
import { ENV } from '../config/env';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to determine if error is retryable
const isRetryableError = (error) => {
  // Retry on network errors or 5xx server errors
  return !error.response || (error.response.status >= 500 && error.response.status < 600);
};

// Retry wrapper function
const withRetry = async (fn, retries = MAX_RETRIES) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && isRetryableError(error)) {
      await delay(RETRY_DELAY);
      return withRetry(fn, retries - 1);
    }
    throw error;
  }
};

// Request interceptor to attach JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authAPI = {
  register: (username, email, password) => {
    return withRetry(() => api.post('/auth/register', { username, email, password }));
  },
  
  login: (email, password) => {
    return withRetry(() => api.post('/auth/login', { email, password }));
  },
  
  me: () => {
    return withRetry(() => api.get('/auth/me'));
  }
};

// Books API functions
export const booksAPI = {
  generate: (bookName, authorName) => {
    return withRetry(() => api.post('/books/generate', { bookName, authorName }));
  },
  
  getHistory: () => {
    return withRetry(() => api.get('/books/history'));
  },
  
  getById: (id) => {
    return withRetry(() => api.get(`/books/${id}`));
  }
};

// Suggestions API functions
export const suggestionsAPI = {
  getAll: () => {
    return withRetry(() => api.get('/suggestions'));
  },
  
  create: (title, author, description) => {
    return withRetry(() => api.post('/suggestions', { title, author, description }));
  }
};

export default api;
