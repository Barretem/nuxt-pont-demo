import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl() {
  return urlResolve(getWholePath('/user/createWithList'));
}

/**
 * @desc Creates list of users with given input array
 */
export function request(bodyParams, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/user/createWithList'),
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
