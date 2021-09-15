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
    <alert-modal v-if="alert" :alert="alert" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AlertModal from '@/components/AlertModal.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  components: { AppHeader, AlertModal },

  setup() {
    const store = useStore()

    const alert = computed(() => store.getters.alert)

    onMounted(() => {
      store.dispatch('setDOMLoaded')
    })

    return { alert, appLoading: computed(() => store.getters['appLoading']) }
  },
}
</script>

<style lang="postcss">
/* === Vendor === */
@import '~nprogress/nprogress.css';
/* Style loading bar between pages. */
/* https://github.com/rstacruz/nprogress */
#nprogress .bar {
  background: blue;
}

/* === Custom === */
@import './assets/tailwind.css';

#app {
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
</style>
