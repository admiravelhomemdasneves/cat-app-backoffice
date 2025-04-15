import axios from 'axios';

//const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'http://cat-app-g9audugfc0fmdpax.westeurope-01.azurewebsites.net/';

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
        if (config.url.startsWith(`${this.baseURL}/auth`)) {
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
    localStorage.removeItem('token'); // Clear invalid token
    window.location.href = '/login'; // Redirect to login
  }

  // Basic CRUD operations
  async get(path, params = {}) {
    try {
      const response = await this.client.get(BASE_URL + path, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
    
  }

  post(path, data = {}) {
    return this.client.post(BASE_URL + path, data);
  }

  put(path, data = {}) {
    return this.client.put(BASE_URL + path, data);
  }

  delete(path) {
    return this.client.delete(BASE_URL + path);
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