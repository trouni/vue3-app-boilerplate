import request from '@/utils/request'

export function logIn({ email, password }) {
  return request({
    url: '/auth/sign_in',
    method: 'post',
    data: { email, password },
  })
}

export function logOut() {
  return request({
    url: '/auth/sign_out',
    method: 'delete',
  })
}

export function signUp({ email, password }) {
  return request({
    url: '/auth',
    method: 'post',
    data: { email, password },
  })
}
