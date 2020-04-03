import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const taskStore = {
  namespaced: true,
  state: {
    tasks: {
      "01": {
        description: "Task 1",
        completed: false,
        date: "22/05/2020",
        time: "18:00"
      },
      "02": {
        description: "Task 2",
        completed: false,
        date: "30/05/2020",
        time: "08:00"
      },
      "03": {
        description: "Task 3",
        completed: false,
        date: "03/06/2020",
        time: "15:00"
      }
    }
  },
  mutations: {
    updateById(state, data) {
      state.tasks[data.id].completed = data.value;
    },
    deleteById(state, id) {
      Vue.delete(state.tasks, id);
    }
  },
  actions: {
    updateById({ commit }, data) {
      commit("updateById", data);
    },
    deleteById({ commit }, id) {
      commit("deleteById", id);
    }
  },
  getters: {
    tasks(state) {
      return state.tasks;
    }
  }
};

export default new Vuex.Store({
  modules: { taskStore }
});
