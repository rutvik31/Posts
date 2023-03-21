import Vue from "vue";
import Vuex from "vuex";
import api from "../plugins/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    postComments: [],
    emailList: [
      "rp@mail.com",
      "sc@mail.com",
      "hh@mail.com",
      "kc@mail.com",
      "test@mail.com",
    ],
    loggedIn: false,
  },
  getters: {},

  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    addComment(state, data) {
      state.postComments.push(data);
    },
    setComments(state, data) {
      state.postComments = data;
    },
  },
  actions: {
    newCommentAdded() {
      localStorage.getItem();
    },
  },
  modules: {},
});
