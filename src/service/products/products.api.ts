import axios from '@/configs/axios.config';
import { ApiResponse, Brand, Category, CreateProductRequest, PaginatedResponse, Product, Tag } from '../service.types';

export const productsApi = {
  // Public product endpoints
  getProducts: (params?: {
    category?: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<PaginatedResponse<Product>>> => axios.get('/api/products', { params }),

  getProduct: (id: number): Promise<ApiResponse<Product>> => axios.get(`/api/products/${id}`),

  // Filter endpoints
  getCategories: (category?: string): Promise<ApiResponse<Category[]>> =>
    axios.get('/api/products/categories', { params: { category } }),

  getBrands: (category?: string): Promise<ApiResponse<Brand[]>> =>
    axios.get('/api/products/brands', { params: { category } }),

  getTags: (category?: string): Promise<ApiResponse<Tag[]>> =>
    axios.get('/api/products/tags', { params: { category } }),

  // Filter products
  filterByCategory: (categoryId: number, category?: string): Promise<ApiResponse<PaginatedResponse<Product>>> =>
    axios.get('/api/products/filter/category', { params: { category_id: categoryId, category } }),

  filterByBrand: (brandId: number, category?: string): Promise<ApiResponse<PaginatedResponse<Product>>> =>
    axios.get('/api/products/filter/brand', { params: { brand: brandId, category } }),

  filterByTag: (tagId: number, category?: string): Promise<ApiResponse<PaginatedResponse<Product>>> =>
    axios.get('/api/products/filter/tag', { params: { tag: tagId, category } }),

  // Admin product management
  admin: {
    getAllProducts: (): Promise<ApiResponse<PaginatedResponse<Product>>> => axios.get('/api/admin/products'),

    getProduct: (id: number): Promise<ApiResponse<Product>> => axios.get(`/api/admin/products/${id}`),

    createProduct: (data: CreateProductRequest): Promise<ApiResponse<Product>> => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          value.forEach((file) => formData.append('images[]', file));
        } else if (key === 'tags' && Array.isArray(value)) {
          value.forEach((tag) => formData.append('tags[]', tag.toString()));
        } else {
          formData.append(key, value.toString());
        }
      });
      return axios.post('/api/admin/products/store', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },

    updateProduct: (id: number, data: Partial<CreateProductRequest>): Promise<ApiResponse<Product>> => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          //  value.forEach((file) => formData.append('images[]', file)); // TODO
        } else if (key === 'tags' && Array.isArray(value)) {
          value.forEach((tag) => formData.append('tags[]', tag.toString()));
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      return axios.patch(`/api/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },

    deleteProduct: (id: number): Promise<ApiResponse<null>> => axios.delete(`/api/admin/products/${id}`),
  },
};
