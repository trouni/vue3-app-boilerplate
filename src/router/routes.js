import store from '@/store'

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/pages/Login'),
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
    name: 'Login',
    component: () => import('@/pages/Login'),
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
    //   name: 'Page',
    //   component: () => import('@/pages/page'),
    //   props: () => ({ propName: value }),
    //   meta: {
    //     authRequired: true,
    //     title: 'Page Title',
    //   },
    // },
  },
]
