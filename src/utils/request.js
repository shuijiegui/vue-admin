import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import { getToken } from './auth'
import store from '@/store'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      Message.error('登录失效，请重新登录')
      router.push('/login')
      store.commit('user/removeToken')
    } else {
      if (error.response) {
        Message.error(error.response.data.msg)
      }
    }

    return Promise.reject(error)
  }
)

export default service
