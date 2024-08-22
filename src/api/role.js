import request from '@/utils/request'

/**
 * @description: 添加角色
 * @param {*}
 * @return {*} promise
 */

export const AddRoleAPI = data => {
  return request(
    { url: 'park/sys/user',
      method: 'post',
      data
    })
}
