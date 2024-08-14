import request from '@/utils/request'

export const getCardList = (params) => {
  return request.get('/parking/card/list', { params })
}
