import axios from 'axios';

import { ApiResponse, CreateCommentRequest, PaginatedResponse } from '../service.types';

export const commentsApi = {
  // Public comment endpoints
  getProductComments: (productId: number): Promise<ApiResponse<PaginatedResponse<Comment>>> =>
    axios.get(`/api/products/${productId}/comments`),

  createComment: (productId: number, data: CreateCommentRequest): Promise<ApiResponse<Comment>> =>
    axios.post(`/api/products/${productId}/comments`, data),

  // Admin comment management
  admin: {
    getPendingComments: (): Promise<ApiResponse<PaginatedResponse<Comment>>> =>
      axios.get('/api/admin/comments/pending'),

    approveComment: (id: number): Promise<ApiResponse<Comment>> => axios.patch(`/api/admin/comments/${id}/approve`),

    rejectComment: (id: number): Promise<ApiResponse<Comment>> => axios.patch(`/api/admin/comments/${id}/reject`),

    deleteComment: (id: number): Promise<ApiResponse<null>> => axios.delete(`/api/admin/comments/${id}`),
  },
};
