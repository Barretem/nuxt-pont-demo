import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl(paramsObj) {
  return urlResolve(getWholePath('/user/{username}'), paramsObj);
}

/**
     * @desc Updated user
This can only be done by the logged in user.
     */
export function request(params, bodyParams, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/user/{username}'),
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      params: params,
      data: bodyParams,
    },
    options,
  );
  return fetch(fetchOption);
}
