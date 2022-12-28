import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.156:3333",
});

// api.interceptors.request.use(
//   async (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(
        new AppError(error.response.data.message, error.response.status)
      );
    }
    return Promise.reject(error);
  }
);

export { api };
