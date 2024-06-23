import axios from 'axios';
import { clearLocalStorage, getItemFromLocalStorage } from './localStorageUtill';

const apiCall = async (apiUrl, method, data = null, headers = {}, hasAuth = false) => {
  // Create a new instance of Axios with default configurations
  const axiosInstance = axios.create({
    withCredentials: true, // Ensure credentials are included
  });

  // Add the authorization interceptor if required
  if (hasAuth) {
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = getItemFromLocalStorage('accessToken');
        if (!token) {
          clearLocalStorage();
          window.location.href = '/login';
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  try {
    const response = await axiosInstance({
      method: method,
      url: apiUrl,
      headers: headers,
      data: data,
    });
    return response.data;
  } catch (error) {
    if (hasAuth && error.response && error.response.status === 401) {
      clearLocalStorage();
      window.location.href = '/login';
    }
    throw error;
  }
};

export default apiCall;
