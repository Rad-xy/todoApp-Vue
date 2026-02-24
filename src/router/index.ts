import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
      props: { filter: 'all' }
    },
    {
      path: '/important',
      name: 'important',
      component: MainPage,
      props: { filter: 'important' }
    },
    {
      path: '/completed',
      name: 'completed',
      component: MainPage,
      props: { filter: 'completed' }
    }
  ],
})

export default router
