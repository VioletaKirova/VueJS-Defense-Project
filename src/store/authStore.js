import * as firebase from "firebase/app";
require("firebase/auth");

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    register(_, data) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(_, data) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  getters: {},
};
