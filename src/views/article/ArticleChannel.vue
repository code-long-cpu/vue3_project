<script setup>
import { ref } from 'vue'
import { getArticleServive } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'

const title = ref('文章分类')
const articles = ref([])

const loading = ref(false)
// console.log(title.value)
const getArticle = async () => {
  loading.value = true
  const res = await getArticleServive()
  articles.value = res.data.data
  articles.value = []
  loading.value = false

  console.log(articles.value)   //✅异步结果最后执行：有值
}
getArticle()
// console.log(articles.value)  //❌同步结果先执行：无值


const Editchannel = (row, $index) => {
  console.log(row, $index)
}

const Deletchannel = (row, $index) => {
  console.log(row, $index)
}



</script>

<template>
  <page-container :title="title">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>

    <el-table :data="articles" stripe style="width: 100%" highlight-current-row v-loading="loading">
      <el-table-column type="index" prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column prop="address" label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button @click="Editchannel(row, $index)" type="primary" :icon="Edit" circle plain></el-button>
          <el-button @click="Deletchannel(row, $index)" type="danger" :icon="Delete" circle plain></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>

    </el-table>

  </page-container>
</template>

<style lang="scss" scoped></style>