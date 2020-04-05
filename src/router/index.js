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
    path: "/in-progress",
    name: "InProgress",
    component: () =>
      import("../components/InProgressTasks.vue")
  },
  {
    path: "/completed",
    name: "Completed",
    component: () =>
      import("../components/CompletedTasks.vue")
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
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../components/Register.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../components/Login.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../components/About.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
