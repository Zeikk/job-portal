import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import JobView from '@/views/JobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/data',
      name: 'home',
      component: JobView
    },
    {
      path: '/web',
      name: 'about',
      component: JobView
    }
  ]
})

export default router
