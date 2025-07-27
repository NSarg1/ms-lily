import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use((request) => {
  return request;
});

export const useInterceptorsResponse = (error: AxiosError) => {
  // TODO --> Implement error handling logic here.
  return Promise.reject(error);
};

axios.interceptors.response.use((response) => response, useInterceptorsResponse);

export default axios;
