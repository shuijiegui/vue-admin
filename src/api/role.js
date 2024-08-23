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
/**
 * @description: 角色详细
 * @param {*}
 * @return {*} promise
 */

export const RoleDetailAPI = id => {
  return request(
    { url: `/park/sys/user/${id}`
    })
}
/**
 * @description: 编辑角色
 * @param {*}
 * @return {*} promise
 */

export const EditRoleAPI = data => {
  return request(
    { url: 'park/sys/user',
      method: 'put',
      data
    })
}
/**
 * @description: 角色详细
 * @param {*}
 * @return {*} promise
 */

export const DeleteRoleAPI = id => {
  return request(
    { url: `/park/sys/user/${id}`,
      method: 'delete'
    })
}
export const resetPwdAPI = id => {
  return request({
    url: '/park/sys/user/resetPwd',
    method: 'put',
    data: { id }
  })
}
