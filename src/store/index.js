import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { getProducts } from "@/utils/https/product";

export default createStore({
  state: {
    products: {
      search: {
        query: "",
        orderBy: "id",
        page: 1,
      },
      data: [],
      isLoading: false,
      isNotFound: true,
      isError: false,
    },
    cart: [],
  },
  // getters: {
  //   productStatus(){

  //   }
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
    setProductsStatus(
      state,
      { isLoading = false, isNotFound = false, isError = false }
    ) {
      state.products = {
        ...state.products,
        isError,
        isLoading,
        isNotFound,
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
        store.commit("setProductsStatus", { isLoading: true });
        const { query, orderBy } = store.state.products.search;
        const result = await getProducts({
          page: 1,
          limit: 10,
          query,
          orderBy,
        });
        if (!result.data.data || result.data.data.length < 1) {
          store.commit("setProductsList", []);
          return store.commit("setProductsStatus", { isNotFound: true });
        }
        store.commit("setProductsList", result.data.data);
        return store.commit("setProductsStatus", { isLoading: false });
      } catch (error) {
        console.log(error);
        return store.commit("setProductsStatus", {
          isLoading: false,
          isError: true,
        });
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
