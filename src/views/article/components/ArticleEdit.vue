<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { artPublishService, editArticleService, arteditServict } from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'

// ①抽屉表单内容编辑,提交请求使用
//默认数据
const defaultForm = {
  title: '', //文章标题
  cate_id: '',//文章分类id
  content: '',//文章内容 已绑定
  cover_img: '',//文章封面  已绑定
  state: '' //文章状态-只能是"已发布"和"草稿"2个字符串
}
//收集数据
const formModel = ref({ ...defaultForm }) //填充数据，展开运算符就是脱一层而已

const imgUrl = ref('') //图片上传相关逻辑
// 上传图片elment组件库的方法，参数uploadFile获取上传的文件
const onSelectFile = (uploadFile) => {
  // console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw)  //创建本地预览地址，预览图片
  formModel.value.cover_img = uploadFile.raw //将图片存入formModel信息中，api提交使用
}

// ②控制抽屉层的显隐 （往formModel中填充接收到的row参数，父组件那边添加无参数，编辑和删除有参数）
const visibleDrawer = ref(false)
const eidtorRef = ref() //绑定富文本编辑器
// 对外给父组件暴露open方法中，控制抽屉的显示和传参
const open = async (row) => {
  //①打开抽屉
  visibleDrawer.value = true
  // ②回显数据
  // 2-1如果有id，说明是编辑旧文章 id是一整行的id
  if (row.id) {
    // 需要基于row.id发送请求，获取响应的旧文章的详情数据
    const res = await editArticleService(row.id)
    console.log(res.data)
    // 回显数据，把获取到的数据给fromModel；数据是双向绑定的v-model给<el-form>的，直接渲染
    formModel.value = res.data.data
    // console.log(formModel.value) 这里有formModel.value.id表示是编辑文章

    // 图片需要单独处理,附加上基地址
    imgUrl.value = baseURL + formModel.value.cover_img

    // 注意：提交给后台的图片需要是file对象格式
    // 需要将图片地址转为file对象，存起来
    formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)

  } else {
    // 2-2无id，说明是添加新文章，使用默认空数据，
    formModel.value = { ...defaultForm }
    // 清空图片，防止上次的添加的图片还有保留
    imgUrl.value = '';
    // 清空富文本编辑器(vueqill的官方方法)
    eidtorRef.value.setHTML('')
    // 空数据空表单基础上，输入新的文章信息，统一提交
  }
}
// 向外暴露open方法
defineExpose({
  open
})

const emit = defineEmits(['success'])
// 发布新文章
const onPublish = async (state) => {
  // 把‘已发布’或‘草稿’存入formModel
  formModel.value.state = state

  // 把收集到的formModel对象转换为formData对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  // 发编辑或添加请求
  if (formModel.value.id) { //这里46行控制抽屉显示地方row传来的给formModel.value.id表示是编辑文章
    // 编辑操作请求  
    await arteditServict(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    // 通知父组件，添加成功
    emit('success', 'edit')
    // console.log('编辑操作')
  } else {
    // 添加操作请求
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件，添加成功
    emit('success', 'add')
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(imgUrl, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}



</script>

<template>
  <!-- 配置抽屉 -->
  <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="50%">
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" style="width:100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
          :on-change="onSelectFile" :auto-upload="false">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- 富文本编辑器 -->
          <quill-editor ref='eidtorRef' theme="snow" v-model:content="formModel.content"
            content-type="html"></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {

  // 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素，所以需要deep
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>