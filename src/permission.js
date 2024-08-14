import router from './router'
import { getToken } from '@/utils/auth'

router.beforeEach((to, from, next) => {
  const whiteList = ['/login'] // no redirect whitelist
  const token = getToken()
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
