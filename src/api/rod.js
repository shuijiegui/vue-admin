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

