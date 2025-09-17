import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import ConsoleView from '@/views/ConsoleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/console',
      name: 'console',
      component: ConsoleView
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
