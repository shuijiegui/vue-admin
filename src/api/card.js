import request from '@/utils/request'

export const getCardList = (params) => {
  return request.get('/parking/card/list', { params })
}
export const createCardAPI = data => {
  return request.post('/parking/card', data)
}
