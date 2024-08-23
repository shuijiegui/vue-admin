
import request from '@/utils/request'

/**
 * 获取规则列表
 * @param { page, pageSize} params
 * @returns
 */
export function getRuleListAPI(params) {
  return request({
    url: 'parking/rule/list',
    params
  })
}
/**
 * 创建规则
 * @returns
 */
export const createRuleAPI = (data) => {
  return request({
    url: '/parking/rule',
    method: 'POST',
    data
  })
}
