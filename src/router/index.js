import { createRouter, createWebHistory } from "vue-router";

import NotFoundComponentVue from "@/components/NotFoundComponent.vue";

import CartView from "../views/CartView.vue";
import HomeView from "../views/HomeView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product",
    children: [
      {
        path: "",
        name: "product",
        component: ProductView,
      },
      {
        path: ":id",
        name: "product detail",
        component: ProductDetailView,
      },
    ],
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  { path: "/:catchAll(.*)", component: NotFoundComponentVue },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
