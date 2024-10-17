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

// 添加和编辑
// 发布文章   data是formData格式的对象（携带文件图片的格式对象）
export const artPublishService = (data) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data,
  })
}

// 编辑文章-获取文章详情
export const editArticleService = (id) => {
  return request({
    url: '/my/article/info',
    method: 'GET',
    params: { id }
  })
}
// 编辑文章-提交文章
export const arteditServict = (data) => {
  return request({
    url: '/my/article/info',
    method: 'PUT',
    data
  })
}

// 编辑文章-删除文章
export const deletArticleService = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: { id }
  })
}
