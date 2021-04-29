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
 * @desc Updates a pet in the store with form data
 */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet/{petId}'),
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: params,
    },
    options,
  );
  return fetch(fetchOption);
}
