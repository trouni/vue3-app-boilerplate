import store from '@/store'
import router from '@/router'
// import i18n from '@/i18n'

// const { t } = i18n.global

const ErrorHandler = class {
  handle(e) {
    const error = e?.response?.data || e?.response || e

    if (e.toJSON().message == 'Network Error') {
      this.networkError()
      // } else if (error.type === 'ErrorType') {
      //   this.handleError()
    } else if (store.getters['auth/loggedIn'] && e?.response?.status === 401) {
      this.unauthorizedError()
    } else if (error.message || error.messages) {
      this.defaultError(error)
    }

    return Promise.reject(error)
  }

  defaultError(error) {
    store.dispatch('setAlert', {
      title: 'Error',
      messages: error.messages ?? [error.message],
      buttonText: null,
    })
  }

  networkError() {
    store.dispatch('setAlert', {
      title: 'Seems like there are connection issues',
      messages: [
        'Check your internet connection.',
        'Make sure the API is available.',
      ],
      buttonText: 'Refresh',
    })
  }

  unauthorizedError() {
    router.push({ name: 'Logout' })
  }
}

export default new ErrorHandler()
