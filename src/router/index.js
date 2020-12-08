import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/views/DashBoard.vue'
import LoginUsers from '@/views/LoginUsers.vue'
import Librarian from '@/views/Librarian.vue'
import Admin from '@/views/Admin.vue'
import Personnel from '@/views/Personnel.vue'
import Student from '@/views/Student.vue'

import SearchBooklist from '@/views/SearchBooklist.vue'
import InformationBooks from '@/views/InformationBooks.vue'
import AddBook from '@/views/AddBook.vue'

Vue.use(VueRouter)

const routes = [
        
        // หน้าหลัก
        {
          path: '/DashBoard',
          name: 'DashBoard',
          component: DashBoard
        },

        //หน้าค้นหาหนังสือ
        {
          path: '/SearchBooklist',
          name: 'SearchBooklist',
          component: SearchBooklist
        },

        //ข้อมูลหนังสือ
        {
          path: '/InformationBooks',
          name: 'InformationBooks',
          component: InformationBooks
        },

        //ระบบLogin
        {
          path: '/LoginUsers',
          name: 'LoginUsers',
          component: LoginUsers
        },
        {
          path: '/Librarian',
          name: 'Librarian',
          component: Librarian
        },
        {
          path: '/Admin',
          name: 'Admin',
          component: Admin
        },
        {
          path: '/Personnel',
          name: 'Personnel',
          component: Personnel
        },
        {
          path: '/Student',
          name: 'Student',
          component: Student
        },
        
        // จัดการข้อมูลสารสนเทศ
        {
          path: '/AddBook',
          name: 'AddBook',
          component: AddBook
        },

        
        {
          path:"/",
          redirect:"/Dashboard"
        },
        {
          path:"*",
          redirect:"/Dashboard"
        }


  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
