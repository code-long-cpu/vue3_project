import request from '@/utils/request';

// 分类：获取文章分类列表
export const getArticleServive = () => {
  return request({
    url: '/my/cate/list',
    method: 'GET',
  })
}
// 分类：添加文章分类
export const addArticleService = (data) => {
  return request({
    method: 'POST',
    url: '/my/cate/add',
    data: data
  })
}
// 分类：更新文章分类
export const setArticleService = (data) => {
  return request({
    method: 'PUT',
    url: '/my/cate/info',
    data: data
  })
}
// 分类：删除文章分类接口 （query的参数需要在params中传递）
export const deleteArticleService = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: { id }
  })
}

// 文章：获取文章列表
export const artListGetService = (params) => {
  return request({
    url: '/my/article/list',
    method: 'GET',
    params,
  })

}