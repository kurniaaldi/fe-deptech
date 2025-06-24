import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_CLIENT,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (["post", "put", "delete"].includes(response.config.method || "")) {
      toast.success("Success!");
    }
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request");
          toast.error("Bad Request");

          break;
        case 401:
          const cookieKeys = Object.keys(Cookies.get());

          cookieKeys.forEach((key) => {
            Cookies.remove(key);
          });
          toast.error("Unauthorized");
          console.error("Unauthorized");
          break;
        case 403:
          toast.error("Forbidden");

          console.error("Forbidden");
          break;
        case 404:
          toast.error("Not Found");

          console.error("Not Found");
          break;
        case 500:
          toast.error("Internal Server Error");
          console.error("Internal Server Error");
          break;
        default:
          toast.error(`Error: ${error?.response?.status}`);

          console.error(`Error: ${error?.response?.status}`);
      }
    } else if (error?.request) {
      toast.error(`"No response from server. Please try again later."`);

      console.error("No response from server. Please try again later.");
    } else {
      toast.error("Forbidden");

      console.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  },
);

export default api;
