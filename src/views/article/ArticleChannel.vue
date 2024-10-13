<script setup>
import { ref } from 'vue'
import { getArticleService } from '@/api/article'


const title = ref('文章分类')
const articles = ref([])
// console.log(title.value)
const getArticle = async () => {
  const res = await getArticleService()
  articles.value = res.data
}
getArticle()

console.log(articles.value)
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