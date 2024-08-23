import request from '@/utils/request'
/**
 * 获取区域管理列表
 * @param { page, pageSize} params
 * @returns
 */
export const getAreaListAPI = (params) => {
  return request({
    url: '/parking/area/list',
    params
  })
}
/**
 * 获取区域下拉列表
 * @param { page, pageSize} params
 * @returns
 */
export const getAreaDropListAPI = () => {
  return request({
    url: '/parking/rule/dropList'
  })
}
/**
 * 添加区域
 * @param { page, pageSize} params
 * @returns
 */
export const addAreaAPI = (data) => {
  return request({
    url: '/parking/area',
    method: 'post',
    data

  })
}
/**
 * 编辑区域
 * @param { page, pageSize} params
 * @returns
 */
export const editAreaAPI = (data) => {
  return request({
    url: '/parking/area',
    method: 'put',
    data

  })
}

/**
 * 删除区域
 * @param { page, pageSize} params
 * @returns
 */
export const delAreaAPI = (id) => {
  return request({
    url: '/parking/area/' + id
  })
}

