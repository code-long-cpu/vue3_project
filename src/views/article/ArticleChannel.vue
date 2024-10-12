<script setup>
import { ref } from 'vue'

const title = ref('文章分类')
</script>

<template>
  <page-container :title="title">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    主体部分放表格
  </page-container>
</template>

<style lang="scss" scoped></style>