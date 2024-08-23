import request from '@/utils/request'

/**
 * 获取楼宇列表
 * @param { page, pageSize} params
 * @returns
 */
export const getBuildingListAPI = (params) => {
  return request({
    url: '/park/building',
    params
  })
}
/**
 * 添加楼宇
 * @param {*} data
 * @returns
 */
export const createBuildingListAPI = (data) => {
  return request({
    url: '/park/building',
    method: 'POST',
    data
  })
}
/**
 * 添加楼宇
 * @param {*} data
 * @returns
 */
export const delBuildingListAPI = (id) => {
  return request({
    url: `/park/building/${id}`,
    method: 'DELETE'
  })
}
/**
 * 获取楼宇详情
 * @param { page, pageSize} params
 * @returns
 */
export const getBuildingDetailAPI = (id) => {
  return request({
    url: '/park/building/' + id
  })
}
/**
 * 修改楼宇
 * @param {*} data
 * @returns
 */
export const editBuildingListAPI = (data) => {
  return request({
    url: '/park/building',
    method: 'put',
    data
  })
}
