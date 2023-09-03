import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { getProducts } from "@/utils/https/product";

export default createStore({
  state: {
    products: {
      search: {
        query: "",
        sortBy: "",
        page: 1,
      },
      data: [],
      isLoading: false,
      isError: false,
    },
    cart: [],
  },
  // getters: {
  // },
  mutations: {
    setProductsList(state, param) {
      state.products.data = param;
    },
    setProductsSearch(state, param) {
      state.products.search = {
        ...state.products.search,
        ...param,
      };
    },
    addToCart(state, payload) {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        existingItem.quantity += payload.quantity;
      } else {
        state.cart.push(payload);
      }
    },
  },
  actions: {
    async fetchProducts(store) {
      try {
        const { query } = store.state.products.search;
        const result = await getProducts(1, 10, query);
        store.commit("setProductsList", result.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    addToCart({ commit }, { id, name, price, qty }) {
      commit("addToCart", { id, name, price, qty });
    },
  },
  plugins: [
    createPersistedState({
      key: "klontong-app",
      paths: ["cart"],
      storage: window.localStorage,
    }),
  ],
  // modules: {
  // }
});
