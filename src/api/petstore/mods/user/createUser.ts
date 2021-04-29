import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl() {
  return urlResolve(getWholePath('/user'));
}

/**
     * @desc Create user
This can only be done by the logged in user.
     */
export function request(bodyParams, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/user'),
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
