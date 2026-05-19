import axios from "axios";
// API root.
const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export default apiClient;