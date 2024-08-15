
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
