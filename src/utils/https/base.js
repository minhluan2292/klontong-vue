import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_HOST;

const api = axios.create({
  baseURL,
});

export default api;
