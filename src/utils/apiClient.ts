import { AxiosRequestConfig, AxiosStatic } from 'axios'

interface ClientInter extends AxiosStatic {
  request<T = any>(config: AxiosRequestConfig): Promise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>

  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
}

export type MethodsTypes =
  | 'request'
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'post'
  | 'put'
  | 'patch'
  | '$get'
  | '$put'
  | '$delete'
  | '$post'

let client: ClientInter

export function setClient(newClient: ClientInter) {
  client = newClient
}

// Request helpers
const reqMethods: Array<MethodsTypes> = [
  'request',
  'delete',
  'get',
  'head',
  'options', // url, config
  'post',
  'put',
  'patch', // url, data, config
  '$get',
  '$put',
  '$delete',
  '$post',
]

const service: ClientInter = {} as ClientInter

reqMethods.forEach((method: MethodsTypes) => {
  service[method] = (...rest: any[]): Promise<any> => {
    if (!client) throw new Error('apiClient not installed')
    return (client[method] as any).apply(null, rest)
  }
})
export const GET = service.get
export const POST = service.post
export const DELETE = service.delete
export const PUT = service.put

export default service
