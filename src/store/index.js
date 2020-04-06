import Vue from "vue";
import Vuex from "vuex";
import taskStore from "./taskStore.js"
import authStore from "./authStore.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { taskStore, authStore },
});
