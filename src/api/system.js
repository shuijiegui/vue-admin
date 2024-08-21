import request from '@/utils/request'
/**
 * 获取角色列表
 * @param { page, pageSize} params
 * @returns
 */
export const getRoleListAPI = (params) => {
  return request({
    url: '/park/sys/role',
    params
  })
}

/**
 * 获取tree权限列表
 * @returns
 */
export const getTreeListAPI = () => {
  return request({
    url: '/park/sys/permision/all/tree'
  })
}
/**
 * 获取当前角色权限点列表
 * @returns
 */
export const getRoleDetailAPI = (roleId) => {
  return request({
    url: `/park/sys/role/${roleId}`
  })
}
/**
 * 获取角色成员列表
 * @returns
 */
export const getRoleUserAPI = (roleId) => {
  return request({
    url: `/park/sys/roleUser/${roleId}`
  })
}
/**
 * 创建角色
 * @returns
 */
export const createRoleUserAPI = (data) => {
  return request({
    url: `/park/sys/role`,
    method: 'POST',
    data
  })
}

/**
 * 更改角色
 * @returns
 */
export const updateRoleAPI = (data) => {
  return request({
    url: `/park/sys/role`,
    method: 'PUT',
    data
  })
}
/**
 * 删除角色
 * @returns
 */
export const delRoleUserAPI = (roleId) => {
  return request({
    url: `/park/sys/role/${roleId}`,
    method: 'DELETE'
  })
}
