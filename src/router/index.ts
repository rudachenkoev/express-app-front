import { createRouter, createWebHistory } from 'vue-router'
import { checkAuthentication } from '@helpers/auth'
import authRoutes from '@/router/auth.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        access: 'public',
        title: 'home',
        layout: 'public'
      }
    },
    ...authRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  if (checkAuthentication()) {
    if (to.meta.access === 'public') next('/')
    else next()
  }
  else if (to.meta.access === 'public') next()
  else next(`/login?path=${encodeURIComponent(to.path)}`)
})

export default router
