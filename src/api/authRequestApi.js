import axios from 'axios';
import { applyInterceptors } from './interceptors';
const apiUrl = import.meta.env.VITE_API_URL;

// instance
const authApi = axios.create({
  baseURL: `${apiUrl}/v2/`,
});

// interceptors
applyInterceptors(authApi);

// api
export const POSTsignin = (apiData) => {
  return authApi.post(`admin/signin`, apiData);
};

export const POSTlogout = () => {
  return authApi.post(`logout`);
};

export const POSTuserCheck = () => {
  return authApi.post(`api/user/check`);
};
