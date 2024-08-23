import request from '@/utils/request'
/**
 * 获取规则列表
 * @param { page, pageSize} params
 * @returns
 */
export const getPaymentListAPI = (params) => {
  return request({
    url: '/parking/payment/list',
    params
  })
}
