<template>
  <div class="min-h-screen">
    <app-header />
    <div class="pt-8">
      <router-view />
      <transition>
        <base-spinner
          v-if="appLoading"
          class="
            top-1/2
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            fixed
          "
        />
      </transition>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  components: { AppHeader },

  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('setDOMLoaded')
    })

    return { appLoading: computed(() => store.getters['appLoading']) }
  },
}
</script>

<style lang="scss">
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';
@import './assets/tailwind.css';

*,
*::before,
*::after {
  // Deactivate text selection on mobile
  @apply select-none md:select-auto;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -ms-user-drag: none;
  user-drag: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
input,
textarea {
  @apply select-text;
}

html {
  // Fix the page to avoid overscroll on mobile app
  @apply fixed md:static w-screen md:w-auto h-screen md:h-auto;
  overscroll-behavior: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Default transition */
.v-enter-active,
.v-leave-active {
  @apply absolute transition-opacity duration-300;
}

.v-enter,
.v-leave-to {
  @apply opacity-0;
}

// ===
// Vendor
// ===
#nprogress .bar {
  background: blue;
}
</style>
