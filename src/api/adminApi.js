import axios from 'axios';
import { applyInterceptors } from './interceptors';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// instance
const adminApi = axios.create({
  baseURL: `${apiUrl}/v2/api/${apiPath}/admin/`,
});

// interceptors
applyInterceptors(adminApi);

// 後台產品 api
export const GETproducts = () => {
  return adminApi.get(`products/all`);
};

export const POSTsingleProduct = (data) => {
  return adminApi.post(`product`, { data: data });
};

export const PUTsingleProduct = (id, data) => {
  return adminApi.put(`product/${id}`, { data: data });
};

export const DELETEsingleProduct = (id, data) => {
  return adminApi.put(`product/${id}`, { data: data });
};

// 後台上傳圖片 api
export const POSTuploadPic = (data) => {
  return adminApi.get(`upload`, data);
};
