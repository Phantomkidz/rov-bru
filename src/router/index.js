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
        component: () => import('../views/school/SchoolList.vue')
      },
      {
        path: '/team',
        name: 'team',
        component: () => import('../views/team/TeamList.vue')
      },
      {
        path: '/hero',
        name: 'hero',
        component: () => import('../views/Heroes/HeroesList.vue')
      }
      ,
      {
        path: '/player',
        name: 'player',
        component: () => import('../views/player/PlayerList.vue')
      },
      {
        path: '/match-results',
        name: 'match-results',
        component: () => import('../views/match_results/MatchResultList.vue')
      },
      {
        path: '/match-detail/:id',
        name: 'match-detail',
        component: () => import('../views/match_results/MatchDetail.vue')
      }

    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
