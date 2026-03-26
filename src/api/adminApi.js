import axios from 'axios';
import { applyInterceptors } from './interceptors';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// instance
const adminApi = axios.create({
  baseURL: `${apiUrl}/v2/api/${apiPath}`,
});

// interceptors
applyInterceptors(adminApi);

// 後台產品 api
export const GETproducts = () => {
  return adminApi.get(`/admin/products`);
};

export const POSTsingleProduct = (data) => {
  return adminApi.post(`/admin/product`, { data: data });
};

export const PUTsingleProduct = (id, data) => {
  return adminApi.put(`/admin/product/${id}`, { data: data });
};

export const DELETEsingleProduct = (id, data) => {
  return adminApi.delete(`/admin/product/${id}`, { data: data });
};

// 後台上傳圖片 api
export const POSTuploadPic = (data) => {
  return adminApi.post(`/admin/upload`, data);
};
