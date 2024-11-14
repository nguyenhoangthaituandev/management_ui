import axios from "axios";
import { apiConfig } from "../../config";
import storage from "../../utils/storage";
import AuthAPI from "../AuthAPI";

const axiosClient = axios.create({
  baseURL: apiConfig.apiUrl
});

axiosClient.interceptors.request.use(async (config) => {
  // add token
  config.headers.Authorization = storage.getToken();
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response != undefined && response.data != undefined) {
    // only get data
    return response.data;
  }
  return response;
}, async (error) => {

  // token is expired
  if (error.response && error.response.status === 401) {
    const originalRequest = error.config; // lưu lại request call api
    await AuthAPI.refreshToken();         // refresthToken
    return axiosClient(originalRequest);  // thực thi lại request
  }

  // internal server
  if (error.response && error.response.status === 500) {
    window.location.href = "/auth/500";
  }

  // Handle errors
  throw error;
});

export default axiosClient;
