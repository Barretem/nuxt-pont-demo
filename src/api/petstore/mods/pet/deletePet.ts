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
 * @desc Deletes a pet
 */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet/{petId}'),
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
