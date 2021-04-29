import { setClient } from '@/utils/apiClient'
import { api } from '@/api'

export default function (ctx, inject) {
  const { $axios, app } = ctx
  // 映射$axios
  setClient(app.$axios)
  ctx.$api = api
  inject('api', api)

  $axios.onRequest((config) => {
    return config
  })

  $axios.onResponse((resp) => {
    return Promise.resolve(resp)
  })

  $axios.onError((error) => {
    // 将错误信息继续抛出，业务逻辑可以进行后续的操作
    return Promise.reject(error)
  })
}
