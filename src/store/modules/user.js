import { loginAPI } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,

  state: {
    token: getToken() || ''

  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    }

  },

  actions: {
    async doLogin(ctx, data) {
      const res = await loginAPI(data)
      ctx.commit('setToken', res.data.token)
    }

  }
}
