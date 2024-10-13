import request from '@/utils/request';

export const getArticleServive = () => {
  return request({
    url: '/my/cate/list',
    method: 'GET',

  })
}