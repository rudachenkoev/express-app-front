import { createRouter, createWebHistory } from 'vue-router'
import { checkAuthentication } from '@helpers/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        access: 'public',
        name: 'signIn',
        layout: 'auth'
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/Registration/Index.vue'),
      meta: {
        access: 'public',
        name: 'signUp',
        layout: 'auth'
      }
    },
    {
      path: '/registration/confirmation',
      name: 'registration-confirmation',
      component: () => import('@/views/Registration/Confirmation.vue'),
      meta: {
        access: 'public',
        name: 'finishRegistration',
        layout: 'auth'
      }
    },
    {
      path: '/password-recovery',
      name: 'password-recovery',
      component: () => import('@/views/PasswordRecovery/Index.vue'),
      meta: {
        access: 'public',
        name: 'passwordRecovery',
        layout: 'auth'
      }
    },
    {
      path: '/password-recovery/confirmation',
      name: 'password-recovery-confirmation',
      component: () => import('@/views/PasswordRecovery/Confirmation.vue'),
      meta: {
        access: 'public',
        name: 'passwordRecovery',
        layout: 'auth'
      }
    }
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
