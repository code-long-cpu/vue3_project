<script setup>
import { ref } from 'vue'
import { getArticleServive } from '@/api/article.js'

const title = ref('文章分类')
const articles = ref([])
// console.log(title.value)
const getArticle = async () => {
  const res = await getArticleServive()
  articles.value = res.data.data
  console.log(articles.value)   //✅异步结果最后执行：有值
}
getArticle()
// console.log(articles.value)  //❌同步结果先执行：无值

</script>

<template>
  <page-container :title="title">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>

    <el-table :data="articles" stripe style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="cate_name" label="分类名称" width="180" />
      <el-table-column prop="cate_alias" label="分类别名" width="180" />
      <el-table-column prop="address" label="操作" />
    </el-table>

  </page-container>
</template>

<style lang="scss" scoped></style>