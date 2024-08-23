import request from '@/utils/request'

/**
 * 获取企业列表
 * @param { page, pageSize} params
 * @returns
 */
export const getEnterpriseListAPI = (params) => {
  return request({
    url: '/park/enterprise',
    params
  })
}

export const getIndustryListAPI = () => {
  return request({
    url: '/park/industry'
  })
}
/**
 * 上传合同
 * @returns
 */
export const uploadAPI = (data) => {
  return request({
    url: '/upload',
    method: 'POST',
    data
  })
}
/**
 * 创建公司
 * @param {*} data
 * @returns
 */
export const createExterpriseAPI = (data) => {
  return request({
    url: '/park/enterprise',
    method: 'POST',
    data
  })
}
/*
*
*数据回填
*/
export const getEnterpriseDetailAPI = (id) => {
  return request({
    url: `/park/enterprise/${id}`
  })
}
/**
 * 更新企业
 * @param {*} data
 * @returns
 */
export const updateExterpriseAPI = (data) => {
  return request({
    url: '/park/enterprise',
    method: 'PUT',
    data
  })
}
/**
 * 删除企业
 * @param {*} id
 * @returns
 */
export const delExterpriseAPI = (id) => {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取楼宇列表
 * @param {*} id
 * @returns
 */
export const getRentBuildListAPI = () => {
  return request({
    url: '/park/rent/building'
  })
}

/**
 * 创建合同
 * @param {*}
 * @returns
 */
export const createRentAPI = (data) => {
  return request({
    url: '/park/enterprise/rent',
    method: 'POST',
    data
  })
}
/**
 * 获取合同列表
 * @param {*} id
 * @returns
 */
export const getRentListAPI = (id) => {
  return request({
    url: `/park/enterprise/rent/${id}`
  })
}

/**
 * 退租
 * @param {合同id} rentId
 * @returns
 */
export const outRentAPI = (rentId) => {
  return request({
    url: `/park/enterprise/rent/${rentId}`,
    method: 'PUT'
  })
}

/**
 * 获取详情
 * @param {企业id} id
 * @returns
 */

export const getEnterpriseDetail = (id) => {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'GET'
  })
}
