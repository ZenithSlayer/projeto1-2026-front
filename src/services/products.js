import { request } from "./client";

export const productsApi = {
  getAll: () => request("/products"),
  
  getById: (id) => request(`/products/${id}`),
};