import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [


  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '',
    component: () => import('../layout/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/school',
        name: 'school',
        component: () => import('../views/school/SchoolList')
      }

    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
