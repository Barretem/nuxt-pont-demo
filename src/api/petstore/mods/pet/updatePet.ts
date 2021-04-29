import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl() {
  return urlResolve(getWholePath('/pet'));
}

/**
 * @desc Update an existing pet
 */
export function request(bodyParams, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet'),
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },

      data: bodyParams,
    },
    options,
  );
  return fetch(fetchOption);
}
