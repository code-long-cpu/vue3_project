<script setup>
// 导入使用element图标
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'

import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
// 获取个人基本信息
const userStore = useUserStore()
// 一进页面就获取用户信息
userStore.getUser()

// 折叠页跳转 @command获取的是每个item匹配的command
const router = useRouter()
const handleCommand = (key) => { //如果不加异步async，没等你是否同意已经清除token并且跳转了
  if (key === 'logout') {
    ElMessageBox.confirm('你确定要退出吗', { //在 async 函数内,使用 await 关键字取代 then 函数,等待获取 Promise 对象成功状态的结果值。等到有值了，就继续下面的代码；点取消，就无值返回来，就不执行下面的代码。
      type: '警告',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      ElMessage({
        type: 'success',  //绿的
        message: '成功退出',
      })
      //退出操作(清除本地token和user基本信息)
      userStore.removeToken()//清除本地token
      userStore.setUser({}) //清除user基本信息
      router.push('/login') //跳转到登录页  
    }).catch(() => {
      ElMessage({
        type: 'info', //灰色
        message: '取消退出',
      })
    })
  } else {
    //跳转操作
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!-- el-menu左侧菜单页面 -->
      <!-- :default-active="$route.path" 为默认高亮的菜单项 -->
      <!-- el-menu-item 里面index就是要route跳转的路径 -->
      <el-menu active-text-color="#ffd04b" background-color="#232323" :default-active="$route.path" text-color="#fff"
        router>
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <!-- 多级菜单栏 template是标题 -具名插槽slot，名字叫title-->
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <!-- 展开内容 -默认插槽 -->
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>黑马程序员：<strong>{{ userStore.user.nickname || userStore.user.username }}</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2023 Created by 谢龙</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>