import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const api = axios.create({
  baseURL: `${server}/api/v1`, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
