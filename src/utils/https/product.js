import api from "./base";

export const getProducts = (page = 1, limit = 10) =>
  api.get("/product", {
    params: {
      page,
      limit,
    },
  });
