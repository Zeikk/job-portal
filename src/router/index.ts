import { createRouter, createWebHistory } from 'vue-router'
import StatsView from "@/views/StatsView.vue"
import OffersView from "@/views/OffersView.vue"
import MainView from "@/views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/data/offers'
    },
    {
      path: '/:theme',
      component: MainView,
      children: [
        {
          path: 'offers',
          component: OffersView,
          props: true

        },
        {
          path: 'stats',
          component: StatsView,
          props: true
        }
      ]
    },

  ]
})

export default router
