import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (config.url.startsWith('/auth')) {
          return config; // Directly return the config without adding the Authorization header
        }

        const token = localStorage.getItem('token');
        if (token && token !== "undefined" && token !== "null") {
          config.headers.Authorization = `Bearer ${token}`;
        } 
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.redirectToLogin();
        }

        return Promise.reject(error);
      }
    );
  }

  // Helper method to redirect to the login page
  redirectToLogin() {
    if (window.location.pathname !== '/login') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  // Basic CRUD operations
  async get(path, params = {}) {
    try {
      const response = await this.client.get(path, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }

  }

  post(path, data = {}) {
    return this.client.post(path, data);
  }

  put(path, data = {}) {
    return this.client.put(path, data);
  }

  delete(path) {
    return this.client.delete(path);
  }

  setAuthToken(token) {
    localStorage.setItem('token', token);
  }

  removeAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }
}

const apiClient = new ApiClient();

export default apiClient;