import { fetch, urlResolve } from '@/utils/fetch';

const getWholePath = (path: string): string => {
  const prefix = '';
  return prefix + path;
};
/**
 * @desc 获取请求的URL
 */
export function getUrl() {
  return urlResolve(getWholePath('/pet/findByTags'));
}

/**
     * @desc Finds Pets by tags
Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     */
export function request(params, options) {
  const fetchOption = Object.assign(
    {
      url: getWholePath('/pet/findByTags'),
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
