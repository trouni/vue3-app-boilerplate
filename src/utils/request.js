import axios from 'axios'
import { config } from '@/constants'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: `${config.apiURL}/${config.apiVersion}`,
  timeout: 15000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  serviceConfig => {
    store.dispatch('setFetchingRequest', true)
    const authHeaders = store.getters['auth/headers']
    serviceConfig.headers = { ...serviceConfig.headers, ...authHeaders }
    return serviceConfig
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status < 200 || response.status >= 300) console.warn(response)

    // Seems like cached requests don't generate new tokens.
    // Need to check first if a new access token has been provided.
    if (response.headers['access-token'])
      store.dispatch('auth/updateHeaders', response.headers)
    store.dispatch('setFetchingRequest', false)
    return response
  },
  error => {
    // Network Error
    if (error.toJSON().message == 'Network Error')
      store.dispatch('setAlert', {
        title: 'Seems like there are connection issues',
        messages: [
          'Check your internet connection.',
        ],
      })

    // Unauthorized Error
    if (store.getters['auth/loggedIn'] && error?.response?.status === 401)
      store.dispatch('auth/logOut')

    // Other errors
    const messages = error?.response?.data || error?.response || error
    if (messages?.errors)
      store.dispatch('setAlert', {
        title: 'Oops, something went wrong...',
        messages: messages.errors,
      })

    store.dispatch('setFetchingRequest', false)
    return Promise.reject(messages)
  }
)

export default service
