import { request } from "./client";

export const addressesApi = {
  
  create: (data) => request("/users/address", {
    method: "POST",
    body: JSON.stringify(data)
  }),

  update: (id, data) => request(`/users/address/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),

  delete: (id) => request(`/users/address/${id}`, { method: "DELETE" }),
  
  setFavorite: (id) => request(`/users/address/${id}/favorite`, { method: "PUT" }),
};