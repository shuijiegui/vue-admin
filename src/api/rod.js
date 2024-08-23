import request from '@/utils/request'

/**
 *
 * 查询一体杆列表
 * /pole/info/list
 */
export const getPoleListAPI = (data) => {
  return request({
    url: '/pole/info/list',
    method: 'get',
    params: data

  })
}
/**
 *
 * 查询一体杆区域
 * /pole/info/list
 */
export const getAreaListAPI = () => {
  return request({
    url: '/parking/area/dropList'
  })
}
/**
 *
 * 添加一体杆
 * /pole/info/list
 */
export const addPoleAPI = (data) => {
  return request({
    url: '/pole/info',
    method: 'post',
    data
  })
}
/**
 *
 * 添加一体杆
 * /pole/info/list
 */
export const editPoleAPI = (data) => {
  return request({
    url: '/pole/info',
    method: 'put',
    data
  })
}
/**
 *
 * 批量删除一体杆
 * /pole/info/list
 */
export const delPoleAPI = (...ids) => {
  return request({
    url: `/pole/info/${ids}`,
    method: 'delete'

  })
}
/**
 *
 * 一体杆警告列表
 * /pole/info/list
 */
export const getPoleWarningListAPI = (params) => {
  return request({
    url: `/pole/warning/list`,
    params: params
  })
}
/**
 *
 * 一体杆警告详情
 * /pole/info/list
 */
export const getPoleWarningDetailAPI = (id) => {
  return request({
    url: `/pole/warning/${id}`
  })
}
/**
 *
 * 一体杆警告删除
 * /pole/info/list
 */
export const delPoleWarningAPI = (id) => {
  return request({
    url: `/pole/warning/${id}`,
    method: 'delete'
  })
}

