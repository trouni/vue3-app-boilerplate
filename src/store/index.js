import { createStore } from 'vuex'
import dispatchActionForAllModules from '@/utils/dispatch-action-for-all-modules'
import modules from './modules'

export default createStore({
  state: {
    DOMLoaded: false,
  },
  getters: {
    DOMLoaded(state) {
      return state.DOMLoaded
    },
  },
  mutations: {
    SET_DOM_LOADED(state) {
      state.DOMLoaded = true
    },
  },
  actions: {
    SetDOMLoaded({ commit }) {
      commit('SET_DOM_LOADED')
    },
  },
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
})

// Automatically run the `init` action for every module,
// if one exists.
dispatchActionForAllModules('init')
