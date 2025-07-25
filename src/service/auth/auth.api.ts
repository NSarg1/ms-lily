import axios from 'axios';

export const authApi = {
  login: (body: { email: string; password: string }) => axios.post('/api/login', body),
};
