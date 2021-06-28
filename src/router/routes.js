import store from '@/store'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Logout',
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters['auth/loggedIn']) store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          route => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { path: '/' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Login',
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ path: '/' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
    // {
    //   path: '/page',
    //   name: 'page',
    //   component: () => import('@/views/page'),
    //   props: () => ({ propName: value }),
    //   meta: {
    //     authRequired: true,
    //     title: 'Page Title',
    //   },
    // },
  },
]
