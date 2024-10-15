<script setup>
import { useRouter, useRoute } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //中文语言包
const router = useRouter() //获取路由对象，跳转用
const route = useRoute() //获取路由参数，


</script>

<template>

  <!-- 中文配置 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
    <!-- 显示一级路由的页面 登录页和框架也，默认首先显示框架也-->
    <!-- 显示一级路由的页面，默认首先显示layout页。不需要跳转链接，直接显示设置的默认页面-->
  </el-config-provider>


</template>

<style scoped></style>
