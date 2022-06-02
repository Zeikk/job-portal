import { createRouter, createWebHistory } from 'vue-router'
import JobView from "@/views/JobView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/data',
      component: JobView,
      props: {
        theme: "Data"
      }
    },
    {
      path: '/web',
      component: JobView,
      props: {
        theme: "Web"
      }
    }
  ]
})

export default router
