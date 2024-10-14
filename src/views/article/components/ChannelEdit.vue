<script setup>
import { ElMessage, rowContextKey } from 'element-plus';
import { ref } from 'vue'
import { setArticleService, addArticleService } from '@/api/article'
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const forRef = ref()

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}

// 打开弹窗，提取参数，添加功能无参数，编辑页面有参数
const open = (row) => {
  // console.log(row)
  // ①父组件点击添加分类，无值，传给弹窗就是无值
  // ②父组件点击编辑有值，就传给弹窗传值
  dialogVisible.value = true
  // ❌错误理解这一行是合并传过来的row值（name，alias和id三个），原来的formModel设置的两个， {...row}这是合并三个
  // 正确理解：{...row}为浅拷贝，row和formModel.value是两种数据。
  // formModel.value = row //✅这个也不会报错
  formModel.value = { ...row }
  console.log(formModel.value)
}

defineExpose({
  open
})

const emit = defineEmits(['success'])
// 弹窗中，添加或修改文章分类确定操作
const onSubmit = async () => {
  await forRef.value.validate()
  // console.log(res)
  const isEdit = formModel.value.id
  if (isEdit) {
    await setArticleService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await addArticleService(formModel.value)
    ElMessage.success('添加成功')
  }
  // 关闭弹层
  dialogVisible.value = false
  // 通知老爹更新弹窗层数据
  emit('success')
}

</script>

<template>
  <!-- 编辑对话框 -->
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="800">
    <!-- <span>这是内容部分</span> -->
    <el-form :model="formModel" :rules="rules" ref="forRef" style="padding:10px 20px">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>