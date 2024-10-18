<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { setUserAvatarService } from '@/api/user'

const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)

const uploadRef = ref()

// 点击选择头像
const onSelectFile = (uploadFile) => {
  // ❌不用一下方法读取图片了，
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)  //创建本地预览地址，预览图片
  // formModel.value.cover_img = uploadFile.raw //将图片存入formModel信息中，api提交使用
  // ✅用下面方法读取图片，把图片转为接口需要的base64格式（头像base64字符串
  // ）的图片
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
    console.log(imageUrl.value)
  }
}
// 点击上传头像，就更新头像
const uploadAvatar = async () => {
  // 头像上传请求成功后
  await setUserAvatarService(imageUrl.value)
  // 重新获取store里的数据，更新头像，给user，LayoutContainer组件中的user信息就会v-model给到标签
  await userStore.getUser()
  // 弹出消息提示
  ElMessage.success('头像上传成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload :auto-upload="false" class="avatar-uploader" :show-file-list="false" ref="uploadRef"
      :on-change="onSelectFile">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <br>
    <el-button type="primary" @click="uploadRef.$el.querySelector('input').click()" :icon="Plus"
      size="large">选择头像</el-button>
    <el-button type="success" :icon="Upload" size="large" @click='uploadAvatar'>上传头像</el-button>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>