import api from "./base";

export const getProducts = (page = 1, limit = 10, query = "") =>
  api.get("/product", {
    params: {
      page,
      limit,
      search: query,
    },
  });

export const getProductDetail = (id) => api.get(`/product/${id}`);
