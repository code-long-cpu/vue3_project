// 引入路由vue-router
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },//登录页
    {
      path: '/', component: () => import('@/views/layout/LayoutContainer.vue'), //加载首页，默认跳转到 layout 页面
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },

      ]
    } //登录页

  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
  return true     //直接放行
  // return false //拦截到来的页面
})



export default router
