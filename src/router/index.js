import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../components/About.vue")
  },
  {
    path: "/create",
    name: "Craete",
    component: () =>
      import("../components/CreateTask.vue")
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () =>
      import("../components/EditTask.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
