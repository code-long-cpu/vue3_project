<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userSetInforService } from '@/api/user'

// 以下是用户信息的数据回显，不需要请求数据，访问store即可
const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()

const userInfo = ref({ username, nickname, email, id })

// 表单验证规则
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

// 提交表单钱，先检查验证格式
const formRef = ref()
const submitForm = async () => {
  await formRef.value.validate();
  // 一旦验证通过，就发起提交修改的请求
  await userSetInforService(userInfo.value)
  getUser()
  // 提示修改成功
  ElMessage.success('修改成功')
}

</script>

<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" ref="formRef" label-width="100px" size="large">
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>