import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl(paramsObj) {
  return urlResolve(getWholePath('/pet/{petId}'), paramsObj);
}

/**
     * @desc Find pet by ID
Returns a single pet
     */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet/{petId}'),
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
