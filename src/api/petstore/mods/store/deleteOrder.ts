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
     * @desc Delete purchase order by ID
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/store/order/{orderId}'),
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      params: params,
    },
    options,
  );
  return fetch(fetchOption);
}
