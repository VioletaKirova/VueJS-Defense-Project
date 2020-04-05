import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import InProgressTasks from "../components/InProgressTasks.vue";
import CompletedTasks from "../components/CompletedTasks.vue";

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
    component: InProgressTasks
  },
  {
    path: "/completed",
    name: "Completed",
    component: CompletedTasks
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
