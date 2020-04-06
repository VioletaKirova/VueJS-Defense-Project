import Vue from "vue";
import { uuid } from "vue-uuid";

export default {
  namespaced: true,
  state: {
    tasks: {
      "01": {
        title: "Task 1",
        description: "Task 1 Desc",
        inProgress: false,
        completed: false,
        date: "22/05/2020",
        time: "18:00",
      },
      "02": {
        title: "Task 2",
        description: "Task 2 Desc",
        inProgress: false,
        completed: false,
        date: "30/05/2020",
        time: "08:00",
      },
      "03": {
        title: "Task 3",
        description: "Task 3 Desc",
        inProgress: false,
        completed: false,
        date: "03/06/2020",
        time: "15:00",
      },
    },
    searchValue: "",
    currentTaskId: "",
  },
  mutations: {
    create(state, data) {
      Vue.set(state.tasks, data.id, data.task);
    },
    updateById(state, data) {
      Object.assign(state.tasks[data.id], data.value);
    },
    deleteById(state, id) {
      Vue.delete(state.tasks, id);
    },
    setSearchValue(state, value) {
      state.searchValue = value;
    },
    setCurrentTaskId(state, value) {
      state.currentTaskId = value;
    },
  },
  actions: {
    create({ commit }, data) {
      commit("create", {
        id: uuid.v4(),
        task: data,
      });
    },
    updateById({ commit }, data) {
      commit("updateById", data);
    },
    deleteById({ commit }, id) {
      commit("deleteById", id);
    },
    setSearchValue({ commit }, value) {
      commit("setSearchValue", value);
    },
    setCurrentTaskId({ commit }, value) {
      commit("setCurrentTaskId", value);
    },
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    filteredTasks(state, getters) {
      const tasks = {};

      if (state.searchValue) {
        Object.keys(state.tasks).forEach((id) => {
          if (
            state.tasks[id].title
              .toLowerCase()
              .includes(state.searchValue.toLowerCase())
          ) {
            tasks[id] = state.tasks[id];
          }
        });

        return tasks;
      }

      return getters.allTasks;
    },
    todoTasks(state, getters) {
      const tasks = {};
      const filteredTasks = getters.filteredTasks;

      Object.keys(filteredTasks).forEach((id) => {
        if (!filteredTasks[id].completed && !filteredTasks[id].inProgress) {
          tasks[id] = filteredTasks[id];
        }
      });

      return tasks;
    },
    inProgressTasks(state, getters) {
      const tasks = {};
      const filteredTasks = getters.filteredTasks;

      Object.keys(filteredTasks).forEach((id) => {
        if (filteredTasks[id].inProgress && !filteredTasks[id].completed) {
          tasks[id] = filteredTasks[id];
        }
      });

      return tasks;
    },
    completedTasks(state, getters) {
      const tasks = {};
      const filteredTasks = getters.filteredTasks;

      Object.keys(filteredTasks).forEach((id) => {
        if (filteredTasks[id].completed) {
          tasks[id] = filteredTasks[id];
        }
      });

      return tasks;
    },
    currentTask(state, getters) {
      return getters.allTasks[state.currentTaskId];
    },
  },
};