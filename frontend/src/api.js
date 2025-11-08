import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export const getProducts = () => API.get("/products");
export const getCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart", data);
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const checkout = (data) => API.post("/checkout", data);
export const updateCartItem = (id, qty) => API.put(`/cart/${id}`, { qty });
