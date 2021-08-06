<template>
  <ul>
    <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes" />
    <NavBarRoutes v-else :routes="loggedOutNavRoutes" />
  </ul>
</template>

<script>
import { authComputed } from '@/store/helpers'
import NavBarRoutes from '@/components/NavBarRoutes'

export default {
  components: { NavBarRoutes },

  data() {
    return {
      loggedInNavRoutes: [
        {
          name: 'Logout',
          title: 'Log out',
          icon: {
            name: 'sign-out-alt',
          },
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'Login',
          title: 'Log in',
          icon: {
            name: 'sign-in-alt',
          },
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
}
</script>
