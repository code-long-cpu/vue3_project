<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter() //获取路由对象，跳转用
const route = useRoute() //获取路由参数，


</script>

<template>

  <router-view></router-view>


</template>

<style scoped></style>
