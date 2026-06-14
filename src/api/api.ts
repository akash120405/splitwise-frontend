import axios from "axios";

const api = axios.create({
  baseURL: "https://splitwise-backend-w3gc.onrender.com/api",
});

export default api;