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
    path: "/to-do",
    name: "ToDo",
    component: () => import("../components/task/ToDoTasks.vue"),
  },
  {
    path: "/in-progress",
    name: "InProgress",
    component: () => import("../components/task/InProgressTasks.vue"),
  },
  {
    path: "/completed",
    name: "Completed",
    component: () => import("../components/task/CompletedTasks.vue"),
  },
  {
    path: "/create",
    name: "Craete",
    component: () => import("../components/task/CreateTask.vue"),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../components/task/EditTask.vue"),
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import("../components/task/TaskDetails.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/user/Register.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("isLogged") == 1) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/user/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("isLogged") == 1) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/About.vue"),
  },
  {
    path: "*",
    component: () => import("../components/NotFound.vue"),
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
