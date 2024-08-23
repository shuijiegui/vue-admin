import request from '@/utils/request'

export const getCardList = (params) => {
  return request.get('/parking/card/list', { params })
}
export const createCardAPI = data => {
  return request.post('/parking/card', data)
}
export const getCardDetailAPI = id => {
  return request.get(`/parking/card/detail/${id}`)
}
export const updateCardAPI = data => {
  return request.put('/parking/card/edit', data)
}
export const delCardAPI = id => {
  return request.delete(`/parking/card/${id}`)
}
export const delCardListAPI = (idList) => {
  return request.delete(`/parking/card/${idList.join(',')}`)
}

