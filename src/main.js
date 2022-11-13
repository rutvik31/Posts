import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axiosInstance from '../src/plugins/axios'
import api from './plugins/api'

Vue.prototype.$axios = axiosInstance;
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
