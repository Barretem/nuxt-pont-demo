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
     * @desc Delete user
This can only be done by the logged in user.
     */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/user/{username}'),
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
