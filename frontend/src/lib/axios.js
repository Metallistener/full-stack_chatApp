import axios from "axios";
import { IS_DEV } from "../constants";

export const axiosInstance = axios.create({
  baseURL: IS_DEV ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});
