import axios from "axios";
import { apiConfig } from "../../config";

const axiosClient = axios.create({
  baseURL: apiConfig.apiUrl
});

axiosClient.interceptors.response.use((response) => {
  if (response != undefined && response.data != undefined) {
    // only get data
    return response.data;
  }
  return response;
}, (error) => {
  // internal server
  if (error.response && error.response.status === 500) {
    window.location.href = "/auth/500";
  }

  // Handle errors
  throw error;
});

export default axiosClient;
