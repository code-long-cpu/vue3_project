<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter() //获取路由对象，跳转用
const route = useRoute() //获取路由参数，


</script>

<template>

  <router-view></router-view>
  <!-- 显示一级路由的页面 登录页和框架也，默认首先显示框架也-->
  <!-- 显示一级路由的页面，默认首先显示layout页。不需要跳转链接，直接显示设置的默认页面-->

</template>

<style scoped></style>
