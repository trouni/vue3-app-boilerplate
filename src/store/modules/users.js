import { RepositoryFactory } from '@/api/repository-factory'
const UsersRepository = RepositoryFactory.get('users')

export const state = {
  cached: [],
}

export const getters = {}

export const mutations = {
  CACHE_USER(state, newUser) {
    state.cached.push(newUser)
  },
}

export const actions = {
  fetchUser({ commit, state, rootState }, { userId }) {
    // 1. Check if we already have the user as a current user.
    const { currentUser } = rootState.auth

    if (currentUser && currentUser.id === userId) {
      return Promise.resolve(currentUser)
    }

    // 2. Check if we've already fetched and cached the user.
    const matchedUser = state.cached.find(user => user.id === userId)
    if (matchedUser) {
      return Promise.resolve(matchedUser)
    }

    // 3. Fetch the user from the API and cache it in case
    //    we need it again in the future.
    return UsersRepository.getUser(userId).then(response => {
      const user = response.data
      commit('CACHE_USER', user)
      return user
    })
  },
}
