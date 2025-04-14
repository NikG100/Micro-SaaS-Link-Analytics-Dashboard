import axios from 'axios';
import { CreateLinkData } from '../types';
import { isValidUrl } from '../utils/urlUtils';

const API_URL = 'http://localhost:5000/api';

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

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: 'No response from server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ message: error.message });
    }
  }
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const linkService = {
  createLink: async (data: CreateLinkData) => {
    const token = localStorage.getItem('token');

    // Validate URL before sending request
    if (!isValidUrl(data.originalUrl)) {
      throw new Error('Invalid URL format');
    }

    try {
      const response = await api.post('/links', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getLinks: async () => {
    try {
      const response = await api.get('/links');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getLinkAnalytics: async (shortUrl: string) => {
    try {
      const response = await api.get(`/links/${shortUrl}/analytics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteLink: async (linkId: string) => {
    try {
      const response = await api.delete(`/links/${linkId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateLink: async (linkId: string, data: Partial<CreateLinkData>) => {
    try {
      const response = await api.put(`/links/${linkId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 