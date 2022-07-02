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
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      }

    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
