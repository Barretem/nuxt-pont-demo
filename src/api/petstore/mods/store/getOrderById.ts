import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl(paramsObj) {
  return urlResolve(getWholePath('/store/order/{orderId}'), paramsObj);
}

/**
     * @desc Find purchase order by ID
For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/store/order/{orderId}'),
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      params: params,
    },
    options,
  );
  return fetch(fetchOption);
}
