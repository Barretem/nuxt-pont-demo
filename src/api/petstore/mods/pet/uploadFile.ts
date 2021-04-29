import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl(paramsObj) {
  return urlResolve(getWholePath('/pet/{petId}/uploadImage'), paramsObj);
}

/**
 * @desc uploads an image
 */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet/{petId}/uploadImage'),
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: params,
    },
    options,
  );
  return fetch(fetchOption);
}
