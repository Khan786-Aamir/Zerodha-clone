import axios from "axios";

const API = axios.create({
  baseURL: "https://zerodha-backend-s9rp.onrender.com",
  withCredentials: true,
});

export default API;
