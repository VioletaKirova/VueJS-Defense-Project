import router from "@/router/index.js";
import * as firebase from "firebase/app";
require("firebase/auth");

const invalidEmailPasswordErrorCode = "auth/wrong-password";
const invalidEmailPasswordError = "Email or password is invalid!";

export default {
  namespaced: true,
  state: {
    isLogged: false,
    authError: "",
  },
  mutations: {
    setIsLogged(state, value) {
      state.isLogged = value;
    },
    setAuthError(state, value) {
      state.authError = value;
    },
  },
  actions: {
    register({ commit }, data) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          commit("setAuthError", "");
        })
        .catch((err) => {
          console.log(err);
          commit("setAuthError", err.message);
        });
    },
    login({ commit }, data) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          commit("setAuthError", "");
        })
        .catch((err) => {
          console.log(err);

          if (err.code === invalidEmailPasswordErrorCode) {
            commit("setAuthError", invalidEmailPasswordError);
          } else {
            commit("setAuthError", err.message);
          }
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
          commit("taskStore/clear", null, { root: true });
          commit("taskStore/setShowTaskLoader", true, { root: true });

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
