import Vue from "vue";
import { uuid } from "vue-uuid";
import * as firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

export default {
  namespaced: true,
  state: {
    tasks: {},
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
    create({ dispatch }, data) {
      dispatch("addTaskInDb", {
        id: uuid.v4(),
        task: data,
      });
    },
    updateById({ dispatch }, data) {
      dispatch("updateTaskInDb", data);
    },
    deleteById({ dispatch }, id) {
      dispatch("deleteTaskInDb", id);
    },
    setSearchValue({ commit }, value) {
      commit("setSearchValue", value);
    },
    setCurrentTaskId({ commit }, value) {
      commit("setCurrentTaskId", value);
    },
    getTasksFromDb({ commit }) {
      const userId = firebase.auth().currentUser.uid;
      const userTasks = firebase.database().ref(`tasks/${userId}`);

      // On add
      userTasks.on("child_added", (snapshot) => {
        const task = snapshot.val();

        const data = {
          id: snapshot.key,
          task: task,
        };

        commit("create", data);
      });

      // On change
      userTasks.on("child_changed", (snapshot) => {
        const task = snapshot.val();

        const data = {
          id: snapshot.key,
          value: task,
        };

        commit("updateById", data);
      });

      // On remove
      userTasks.on("child_removed", (snapshot) => {
        commit("deleteById", snapshot.key);
      });
    },
    addTaskInDb(_, data) {
      const userId = firebase.auth().currentUser.uid;
      const userTask = firebase.database().ref(`tasks/${userId}/${data.id}`);

      userTask.set(data.task);
    },
    updateTaskInDb(_, data) {
      const userId = firebase.auth().currentUser.uid;
      const userTask = firebase.database().ref(`tasks/${userId}/${data.id}`);

      userTask.update(data.value);
    },
    deleteTaskInDb(_, id) {
      const userId = firebase.auth().currentUser.uid;
      const userTask = firebase.database().ref(`tasks/${userId}/${id}`);

      userTask.remove();
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
