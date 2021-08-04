import { createStore } from 'vuex'
import dispatchActionForAllModules from '@/utils/dispatchActionForAllModules'
import modules from './modules'

export default createStore({
  state: {
    DOMLoaded: false,
    fetchingRequest: false,
    alert: null,
  },
  getters: {
    DOMLoaded(state) {
      return state.DOMLoaded
    },
    fetchingRequest(state) {
      return state.fetchingRequest
    },
    appLoading(state) {
      return !state.DOMLoaded || state.fetchingRequest
    },
  },
  mutations: {
    SET_DOM_LOADED(state) {
      state.DOMLoaded = true
    },
    SET_FETCHING_REQUEST(state, value) {
      state.fetchingRequest = value
    },
    SET_ALERT(state, alert) {
      state.alert = alert
    },
  },
  actions: {
    setFetchingRequest({ commit }, value) {
      commit('SET_FETCHING_REQUEST', value)
    },
    setDOMLoaded({ commit }) {
      commit('SET_DOM_LOADED')
    },
    setAlert(
      { commit },
      { title, messages, buttonText, buttonAction, classes }
    ) {
      commit('SET_ALERT', {
        title,
        messages,
        buttonText,
        buttonAction,
        classes,
      })
    },
    resetAlert({ commit }) {
      commit('SET_ALERT', null)
    },
    resetStore({ dispatch }) {
      dispatch('bookings/resetBooking')
      dispatch('checkins/resetCheckin')
      dispatch('auth/logOut')
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
