import axios from 'axios';

class ApiClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (config.url.startsWith(`${this.baseURL}/auth/`)) {
          return config; // Directly return the config without adding the Authorization header
        }

        const token = localStorage.getItem('token');
        if (token && token !== "undefined" && token !== "null") {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // Redirect if token is missing or invalid
          this.redirectToLogin();
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
          // Redirect on authentication failure
          this.redirectToLogin();
        }
        return Promise.reject(error);
      }
    );
  }

  // Helper method to redirect to the login page
  redirectToLogin() {
    localStorage.removeItem('token'); // Clear invalid token
    window.location.href = '/login'; // Redirect to login
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

// Instantiate the client with your base URL
const apiClient = new ApiClient('http://cat-app-g9audugfc0fmdpax.westeurope-01.azurewebsites.net');
//const apiClient = new ApiClient('http://localhost:8080');

export default apiClient;