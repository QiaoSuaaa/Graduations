import { getToken } from '@/helpers/token'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

instance.interceptors.request.use(
  config => {
    const token = getToken() // 获取存储的 Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 在请求头中添加 Authorization
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance
