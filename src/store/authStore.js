import router from "@/router/index.js";
import * as firebase from "firebase/app";
require("firebase/auth");

export default {
  namespaced: true,
  state: {
    isLogged: false,
    isRegistered: false,
  },
  mutations: {
    setIsLogged(state, value) {
      state.isLogged = value;
    },
  },
  actions: {
    register(_, data) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          router.push("/login");
        })
        .catch((err) => {
          //TODO: Show error message
          console.log(err);
        });
    },
    login(_, data) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then()
        .catch((err) => {
          //TODO: Show error message
          console.log(err);
        });
    },
    logout() {
      firebase.auth().signOut();
    },
    authStateChangeHandler({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setIsLogged", true);
          localStorage.setItem("isLogged", 1);

          dispatch("taskStore/getTasksFromDb", null, { root: true });

          dispatch("redirect", "/dashboard");
        } else {
          commit("setIsLogged", false);
          localStorage.setItem("isLogged", 0);
          dispatch("redirect", "/");
        }
      });
    },
    redirect(_, value) {
      if (router.history.current.path !== value) {
        router.push(value);
      }
    },
  },
  getters: {},
};
