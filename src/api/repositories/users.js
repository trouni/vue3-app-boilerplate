import Repository from './repository'

export default {
  getUser(userId, params = {}) {
    return Repository.get(`/users/${userId}`, { params })
  },
}
