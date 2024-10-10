<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores/index'

const router = useRouter() //获取路由对象，跳转用
const route = useRoute() //获取路由参数，

const goIndex = () => {
  router.push('index')

}
const goList = () => {
  router.push('list')
}

const userStore = useUserStore()
const userCount = useCountStore()

</script>

<template>
  <div>我是app</div>
  <button @click='goList'>跳列表页</button>
  <el-button @click='goIndex'>跳首页</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <hr>
  <p>用index.js文件统一管理store中的所有仓库模块</p>
  <span>测试获取Token值：{{ userStore.token }}</span><br>
  <el-button @click="userStore.setToken('token-dasgnjhnvhdjngjnvjd')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
  <hr>
  <p>用index.js文件统一管理store中的所有仓库模块</p>
  <el-button @click="userCount.subCount(1)">减1</el-button>
  {{ userCount.count }}
  <el-button @click="userCount.addCount(1)">加1</el-button>

</template>

<style scoped></style>
