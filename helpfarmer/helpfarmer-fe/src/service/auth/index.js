import instance from '../instance'

export const register = (account, password,name, code) => {
  return instance.post('/auth/register', { account, password,name, code })
}
export const login = (account, password) => {
  return instance.post('/auth/login', { account, password })
}
export const search = id => {
  return instance.get(`/auth/search/${id}`)
}
