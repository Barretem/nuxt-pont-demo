import qs from 'qs'
import { AxiosRequestConfig } from 'axios'

import axios, { MethodsTypes } from './apiClient'

export function urlResolve(url: string, paramsObj?: { [key: string]: string }) {
  if (!paramsObj || !url.includes('{')) return url

  const urlArray = url.split(`/`).map((item) => {
    if (item.includes('{')) {
      const paramName = item.replace(/[{}\s]/g, '')
      return paramsObj[paramName]
    }
    return item
  })
  return urlArray.join('/')
}

export function fetch(options: AxiosRequestConfig) {
  const { params } = options
  options.url = urlResolve(options.url as string, params)
  // get/post 设置请求头的方式不一样，需要兼容
  // 参考：https://www.cnblogs.com/dudu123/p/10107242.html
  if (options.method === 'get' || options.method === 'delete') {
    const data = options.data || {}
    return axios[options.method](options.url, {
      ...params,
      data,
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false })
      },
    }).then((res) => res.data)
  }
  return axios[options.method as MethodsTypes](options.url, options.data, {
    params: options.params,
  }).then((res) => res.data)
}
