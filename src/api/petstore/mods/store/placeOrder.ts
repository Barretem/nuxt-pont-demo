import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl() {
  return urlResolve(getWholePath('/store/order'));
}

/**
 * @desc Place an order for a pet
 */
export function request(bodyParams, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/store/order'),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },

      data: bodyParams,
    },
    options,
  );
  return fetch(fetchOption);
}
