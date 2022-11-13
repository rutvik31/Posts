import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../pages/post/list.vue'
import Details from '../pages/post/details.vue'
import Comments from '../pages/post/comments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/post'
  },
  {
    path: '/post',
    name: 'post',
    component: List
  },
  {
    path: '/post/:id',
    name: 'postDetails',
    component: Details
  },
  {
    path: '/post/:id/comments',
    name: 'postComments',
    component: Comments
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
