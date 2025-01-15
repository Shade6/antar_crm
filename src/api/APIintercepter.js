import axios from "axios";
// const baseUrl = "http://localhost:8088/api/";
// const image_upload_url = "http://localhost:8088/"
// export const Image_url = "http://localhost:8088/uploads/"
import { USER_API } from "./EndPoint";
const BASE_URL = USER_API;


// Function to get headers
const getHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = getHeaders();
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response || error.response.status == 404) {
      localStorage.clear();
      // navigate('/login')
      window.location.reload(BASE_URL+'login')
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;