<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}

defineExpose({
  open
})

</script>

<template>
  <!-- 编辑对话框 -->
  <el-dialog v-model="dialogVisible" title="添加弹层" width="800">
    <span>这是内容部分</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>