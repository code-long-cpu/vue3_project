<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { formatTime } from '@/utils/format.js'
import { artListGetService } from '@/api/article'

const total = ref(0)
const articleList = ref([
  // {
  //   Id: 5961,
  //   title: "新的文章啊",
  //   pub_date: "2022-07-10 14:53:52.604",
  //   state: "已发布",
  //   cate_name: "体育"
  // },
  // {
  //   Id: 5962,
  //   title: "新的文章啊",
  //   pub_date: "2022-07-10 14:54:30.904",
  //   state: "草稿",
  //   cate_name: "体育"
  // }
])
// 编辑逻辑
const onEditArticle = (row) => {
  console.log(row)
}
// 删除逻辑
const onDeletArticle = (row) => {
  console.log(row)
}

// const cateId = ref(38444)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})

const getArtList = async () => {
  const res = await artListGetService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  console.log(res.data.data)
}
getArtList()

// 分页逻辑
const onSizeChange = (size) => {
  console.log(size)
}
const onCurrentChange = (page) => {
  console.log(page)
}

</script>
<template>
  <page-container title="文章管理">
    <!-- 编辑：头部 -->
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <!-- 表单区域：文章搜索栏 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- vue2中，表单的v-model 是 :value和@input的简写 -->
        <!-- vue3中，表单的v-model 是 :modelValue和@update:modelValue的简写 -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 240px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 ：文章列表显示-->
    <el-table :data='articleList'>
      <el-table-column label="文章标题" prop="title">
        <!-- 作用域插槽的内容 -->
        <!-- row是子组件中的行数据，用作用域插槽传值给父组件el-link，就可以操作定制子组件数据-->
        <!-- template在这里主要是为了定位slot和传值，没啥卵用 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" prop="">
        <template #default="{ row }">
          <el-button circle plain type="primary" :icon="Edit" @click="onEditArticle(row)"></el-button>
          <el-button circle plain type="danger" :icon="Delete" @click="onDeletArticle(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" :page-sizes="[2, 3, 5, 10]"
      :background="true" layout="jumper,total, sizes, prev, pager, next" :total="total" @size-change="onSizeChange"
      @current-change="onCurrentChange" style="margin-top:20px;justify-content: flex-end;" />
  </page-container>
</template>

<style lang="scss" scoped></style>