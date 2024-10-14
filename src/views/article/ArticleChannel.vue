<script setup>
import { ref } from 'vue'
import { getArticleServive, deleteArticleService } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'

import ChannelEdit from '@/views/article/components/ChannelEdit.vue'

const title = ref('文章分类')
const articles = ref([])

const loading = ref(false)

// console.log(title.value)
// 获取文章列表并渲染
const getArticle = async () => {
  loading.value = true
  const res = await getArticleServive()
  articles.value = res.data.data
  // articles.value = []
  loading.value = false

  // console.log(articles.value)   //✅异步结果最后执行：有值
}
getArticle()
// console.log(articles.value)  //❌同步结果先执行：无值

// 绑定channelEdite组件，dailog控制组件
const dailog = ref(null)

// 一、1️⃣channelEdite组件操作(有传值）
// 编辑分类（传本行的值给组件channelEdite）
const Editchannel = (row) => {
  // console.log(row, $index)
  dailog.value.open(row)
}
//删除改行数据
const Deletchannel = async (row) => {
  // await获取promise成功状态的结果值，然后再执行下一步，否则就中断程序
  await ElMessageBox.confirm(
    '你确定要删除吗？',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  await deleteArticleService(row.id)
  ElMessage.success('删除成功')
  getArticle()

}
// 二、2️⃣父勤添加分类操作(无传值)
// 添加分类（传空对象给组件channelEdite）
const dialogOn = () => {
  dailog.value.open({})
}
// 接收子组件的方法：重新获取文章列表
const OnSuccess = () => {
  getArticle()
}
</script>

<template>
  <page-container :title="title">
    <template #extra>
      <el-button type="primary" @click="dialogOn">添加分类</el-button>
    </template>

    <el-table :data="articles" stripe style="width: 100%" highlight-current-row v-loading="loading">
      <el-table-column type="index" prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column prop="address" label="操作" width="150">
        <!-- 编辑和删除按钮 作用域插槽传值给组件slot-->
        <template #default="{ row, $index }">
          <el-button @click="Editchannel(row, $index)" type="primary" :icon="Edit" circle plain></el-button>
          <el-button @click="Deletchannel(row, $index)" type="danger" :icon="Delete" circle plain></el-button>
        </template>
      </el-table-column>
      <!-- 无内容显示 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 编辑对话框 自定义组件-->
    <ChannelEdit ref="dailog" @success="OnSuccess"></ChannelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>