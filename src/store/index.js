import { createStore } from 'vuex'
import dispatchActionForAllModules from '@/utils/dispatch-action-for-all-modules'
import modules from './modules'

export default createStore({
  state: {
    DOMLoaded: false,
    fetchingRequestStatus: false,
    alert: null,
  },
  getters: {
    DOMLoaded(state) {
      return state.DOMLoaded
    },
    fetchingRequestStatus(state) {
      return state.fetchingRequestStatus
    },
    appLoading(state) {
      return !state.DOMLoaded || state.fetchingRequestStatus
    },
    alert(state) {
      return state.alert
    },
  },
  mutations: {
    SET_DOM_LOADED(state) {
      state.DOMLoaded = true
    },
    SET_FETCHING_STATUS(state, value) {
      state.fetchingRequestStatus = value
    },
    SET_ALERT(state, alert) {
      state.alert = alert
    },
  },
  actions: {
    setFetchingStatus({ commit }, value) {
      commit('SET_FETCHING_STATUS', value)
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
