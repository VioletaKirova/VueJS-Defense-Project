import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/Dashboard.vue"),
  },
  {
    path: "/in-progress",
    name: "InProgress",
    component: () => import("../components/InProgressTasks.vue"),
  },
  {
    path: "/completed",
    name: "Completed",
    component: () => import("../components/CompletedTasks.vue"),
  },
  {
    path: "/create",
    name: "Craete",
    component: () => import("../components/CreateTask.vue"),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../components/EditTask.vue"),
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import("../components/TaskDetails.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem("isLogged") == 1) {
        next("/")
      } else {
        next();
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem("isLogged") == 1) {
        next("/")
      } else {
        next();
      }
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem("isLogged");

  if (
    isLogged == 0 &&
    to.path !== "/" &&
    to.path !== "/about" &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
