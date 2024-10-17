<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { formatTime } from '@/utils/format.js'
import { artListGetService, deletArticleService } from '@/api/article'
// 导入组件不需要大括号
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

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

// 组件文章编辑抽屉
const articleEditRef = ref()
// ①添加文章逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// ②编辑文章逻辑
const onEditArticle = (row) => {
  // console.log(row)
  articleEditRef.value.open(row)

}
// ③删除文章逻辑
const onDeletArticle = async (row) => {
  // // console.log(row)
  // const res = await deletArticleService(row.id)
  // // console.log(res)
  // ElMessage.success('删除成功')
  // // 重新获取文章列表
  // getArtList()

  // 消息弹窗提示是否删除文件
  ElMessageBox.confirm(
    '你确定删除文章吗?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '成功删除',
      })
      deletArticleService(row.id)
      getArtList()

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

// 数据请求条件params，之后的增删改查都是改这个条件，再重新发起数据请求
// const cateId = ref(38444)
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: '',
})
// table表格的v-loading加载效果
const loading = ref(false)

const getArtList = async () => {
  loading.value = true //发请求前开loading
  const res = await artListGetService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  console.log(res.data.data)
  loading.value = false //请求回来后关loading

}
// 一进页面就请求文章总数据并渲染
getArtList()

// 分页逻辑(每页多少数据)
const onSizeChange = (size) => {
  // 分页数目变了，当前访问的页面会消失，重新排布数据
  // 直接跳转到第一页，重新排布每页条数
  params.value.pagenum = 1
  params.value.pagesize = size
  // 重新请求页面数据
  getArtList()

}
// 获取当前页数据
const onCurrentChange = (page) => {
  params.value.pagenum = page
  // 重新请求页面数据
  getArtList()
}
// 搜索逻辑，按照最新的条件params重新检索，还是从第一页展示，ChannelSelect组件绑定了cate_id，父亲中params最新的条件就是从搜索栏绑定到了新的params.cate_id，并传到了params对象里，通过getArtList()携带新的cate_id从新获取新的数据；
const onSearch = () => {
  params.value.pagenum = 1 //肯定是从第一页开始展示
  getArtList()
}

// 重置逻辑 将筛选条件params清空，从新检索，从第一页展示
const onReset = () => {
  params.value.pagenum = 1; //重置第一页页面
  params.value.cate_id = '', //cate_id清零
    params.value.state = '', //state清零
    getArtList()
}

// 组件抽屉添加或者编辑，成功后文章管理页面的操作
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize) //向上取整，5条数据/每页 2条=3页
    params.value.pagenum = lastPage  //得到当前页
    // 重新获取当前页数据
    getArtList()

  } else {
    // 如果是编辑，直接渲染当前页，不用跳转，因为笔记的文章就在当前页
    getArtList()

  }
}


</script>
<template>
  <page-container title="文章管理">
    <!-- 编辑：头部 -->
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
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
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 ：文章列表显示-->
    <el-table :data='articleList' v-loading="loading">
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
          <!-- row是子组件slot绑定传回的数据，也就数本行的数据-->
          <el-button circle plain type="primary" :icon="Edit" @click="onEditArticle(row)"></el-button>
          <el-button circle plain type="danger" :icon="Delete" @click="onDeletArticle(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮区域 -->
    <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" :page-sizes="[2, 3, 5, 10]"
      :background="true" layout="jumper,total, sizes, prev, pager, next" :total="total" @size-change="onSizeChange"
      @current-change="onCurrentChange" style="margin-top:20px;justify-content: flex-end;" />

    <!-- 抽屉添加文章 -->
    <ArticleEdit ref='articleEditRef' @success="onSuccess"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>