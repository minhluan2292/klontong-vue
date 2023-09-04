import api from "./base";

export const getProducts = ({
  page = 1,
  limit = 10,
  query = "",
  orderBy = "id",
}) =>
  api.get("/product", {
    params: {
      page,
      limit,
      search: query,
      sortBy: orderBy,
    },
  });

export const getProductDetail = (id) => api.get(`/product/${id}`);
