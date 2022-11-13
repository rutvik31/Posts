import Vue from 'vue'
import Vuex from 'vuex'
import api from '../plugins/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postList: [],
    postComments: [],
    postDetails: {}
  },
  getters: {
  },
  mutations: {
    setPostList(state, data) {
      state.postList = data;
    },
    setCommentList(state, data) {
      state.postComments = data;
    },
    setpostDetails(state, data) {
      state.postDetails = data;
    },
    addComment(state, data) {
      state.postComments.push(data);
    }
  },
  actions: {
    getPostList(context) {
      api.posts.getList().then((res) => {
        context.commit("setPostList", res.data)
      });
    },
    getCommentsForPost(context, id) {
      api.posts.getPostCommentObject(id)
        .then((res) => {
          context.commit("setCommentList", res.data)
        });
    },
    getPostObject(context, id) {
      api.posts.getPostObject(id).then((res) => {
        context.commit("setpostDetails", res.data)
      });
    },
  },
  modules: {
  }
})
