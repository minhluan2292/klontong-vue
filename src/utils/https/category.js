import api from "./base";

export const getCategories = ({ page = 1, limit = 4 }) => {
  return api.get("/category", {
    params: {
      page,
      limit,
    },
  });
};
