import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 */

export const loginAPI = data => {
  return request.post('/park/login', data)
}
