import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../pages/post/list.vue'
import Details from '../pages/post/details.vue'
import Login from '../pages/post/login.vue'
import { isAuthenticated } from '../plugins/functions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/post',
    name: 'post',
    component: List,
  },
  {
    path: '/post/:id',
    name: 'post-details',
    component: Details,
  },
  {
    path: '/login',
    name: 'user-login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'user-login' && !isAuthenticated()) next({ name: 'user-login' })
  else next()
})

export default router
