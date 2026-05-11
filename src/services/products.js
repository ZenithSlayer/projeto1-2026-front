import { request } from "./client.ts";

export const productsApi = {
  getAll: () => request("/products"),
  
  getAllCategory: (id) => request(`/products/tag/:id`),

  getById: (id) => request(`/products/${id}`),
};