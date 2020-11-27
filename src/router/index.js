import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import LoginUsers from '../views/LoginUsers.vue'
import SearchBooklist from '../views/SearchBooklist.vue'
import informationBooks from '../views/informationBooks.vue'

Vue.use(VueRouter)

const routes = [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },

        {
          path: '/LoginUsers',
          name: 'LoginUsers',
          component: LoginUsers
        },

        {
          path: '/SearchBooklist',
          name: 'SearchBooklist',
          component: SearchBooklist
        },

        {
          path: '/informationBooks',
          name: 'informationBooks',
          component: informationBooks
        },



  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
