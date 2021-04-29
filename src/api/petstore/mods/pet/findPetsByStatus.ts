import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl() {
  return urlResolve(getWholePath('/pet/findByStatus'));
}

/**
     * @desc Finds Pets by status
Multiple status values can be provided with comma separated strings
     */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet/findByStatus'),
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
