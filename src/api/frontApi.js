import axios from 'axios';
import { applyInterceptors } from './interceptors';
const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// instance
const frontApi = axios.create({
  baseURL: `${apiUrl}/v2/api/${apiPath}/`,
});

// interceptors
applyInterceptors(frontApi);

// 前台產品 api
export const GETproducts = () => {
  return frontApi.get(`products/all`);
};
export const GETsingleProducts = (id) => {
  return frontApi.get(`product/${id}`);
};

// 前台購物車 api
export const GETcart = () => {
  return frontApi.get(`cart`);
};
export const POSTcart = (data) => {
  return frontApi.post(`cart`, { data: data });
};
export const PUTcart = (cartID, data) => {
  return frontApi.put(`cart/${cartID}`, { data: data });
};
export const DELETsingleCart = (cartID) => {
  return frontApi.delete(`cart/${cartID}`);
};
export const DELETcarts = () => {
  return frontApi.delete(`carts`);
};

// 前台結帳 api
export const GETorders = () => {
  return frontApi.get(`orders`);
};
export const GETsingleOrders = (orderID) => {
  return frontApi.get(`order/${orderID}`);
};
export const POSTorder = (data) => {
  return frontApi.post(`order`, { data: data });
};

// 前台付款 api
export const POSTpay = (orderID) => {
  return frontApi.post(`pay/${orderID}`);
};
