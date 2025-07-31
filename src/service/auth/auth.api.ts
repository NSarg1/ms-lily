import axios from 'axios';

import { ApiResponse, LoginRequest, RegisterRequest, User } from '../service.types';

export const authApi = {
  // Authentication
  login: (body: LoginRequest): Promise<ApiResponse<{ user: User; token?: string }>> => axios.post('/api/login', body),

  register: (body: RegisterRequest): Promise<ApiResponse<{ user: User; token?: string }>> =>
    axios.post('/api/register', body),

  logout: (): Promise<ApiResponse<null>> => axios.post('/api/logout'),

  // User management
  getUser: (): Promise<ApiResponse<User>> => axios.get('/api/user'),

  getProfile: (): Promise<ApiResponse<User>> => axios.get('/api/profile'),

  updateProfile: (body: Partial<RegisterRequest>): Promise<ApiResponse<User>> => axios.patch('/api/profile', body),

  // Email verification
  verifyEmail: (id: string, hash: string, expires: string, signature: string): Promise<ApiResponse<null>> =>
    axios.get(`/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`),
};
