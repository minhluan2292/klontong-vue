import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { getCategories } from "@/utils/https/category";
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
    suggestion: {
      data: [],
      isLoading: false,
      isNotFound: true,
      isError: false,
    },
  },
  getters: {
    cartGrandTotal(state) {
      return state.cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
    },
  },
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
        existingItem.qty += payload.qty;
      } else {
        console.log(payload);
        state.cart.push(payload);
      }
    },
    incrementCart(state, payload) {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem && existingItem.qty < 30000) {
        existingItem.qty++;
      }
    },
    decrementCart(state, payload) {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem && existingItem.qty > 1) {
        existingItem.qty--;
      }
    },
    changeQtyCart(state, payload) {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem && !isNaN(payload.qty)) {
        existingItem.qty = payload.qty;
      }
    },
    deleteProductCart(state, payload) {
      const indexToRemove = state.cart.findIndex(
        (item) => item.id === payload.id
      );

      if (indexToRemove !== -1) {
        // Remove the item from the cart by index
        state.cart.splice(indexToRemove, 1);
      }
    },
    setSuggestions(state, payload) {
      state.suggestion.data = payload;
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
    async fetchSuggestions(store) {
      try {
        const result = await getCategories({ page: 1, limit: 4 });
        if (result.data.data.length < 1) return;
        const data = result.data.data.map((item) => item.name);
        store.commit("setSuggestions", data);
      } catch (error) {
        console.log(error);
      }
    },
    addToCart({ commit }, { id, name, price, qty, image }) {
      commit("addToCart", { id, name, price, qty, image });
    },
    incrementCartQty({ commit }, { id, name, price, qty, image }) {
      commit("incrementCart", { id, name, price, qty, image });
    },
    decrementCartQty({ commit }, { id, name, price, qty, image }) {
      commit("decrementCart", { id, name, price, qty, image });
    },
    changeCartQty({ commit }, { id, name, price, qty, image }) {
      commit("changeQtyCart", { id, name, price, qty, image });
    },
    deleteProductCart({ commit }, { id, name, price, qty, image }) {
      commit("deleteProductCart", { id, name, price, qty, image });
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
