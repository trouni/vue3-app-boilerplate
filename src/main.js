import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const vueApp = createApp(App)

// Globally register all `_base`-prefixed components
import globals from '@/components/globals'
globals(vueApp)

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
vueApp.component('font-awesome-icon', FontAwesomeIcon)

vueApp.use(store).use(router).mount('#app')
