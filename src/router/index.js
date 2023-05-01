import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "register-page",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/user/:id",
    name: "user-page",
    component: () => import("../views/ToDoView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
