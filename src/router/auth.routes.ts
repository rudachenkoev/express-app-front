export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Authentication/Login.vue'),
    meta: {
      access: 'public',
      title: 'signIn',
      layout: 'auth'
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/Authentication/Registration.vue'),
    meta: {
      access: 'public',
      title: 'signUp',
      layout: 'auth'
    }
  },
  {
    path: '/registration/confirmation',
    name: 'registration-confirmation',
    component: () => import('@/views/Authentication/PasswordConfirmation.vue'),
    meta: {
      access: 'public',
      title: 'finishRegistration',
      layout: 'auth'
    }
  },
  {
    path: '/password-recovery',
    name: 'password-recovery',
    component: () => import('@/views/Authentication/PasswordRecovery.vue'),
    meta: {
      access: 'public',
      title: 'passwordRecovery',
      layout: 'auth'
    }
  },
  {
    path: '/password-recovery/confirmation',
    name: 'password-recovery-confirmation',
    component: () => import('@/views/Authentication/PasswordConfirmation.vue'),
    meta: {
      access: 'public',
      title: 'passwordRecovery',
      layout: 'auth'
    }
  }
]
