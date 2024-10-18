import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'


// 用户模块token settoken removetoken
export const useUserStore = defineStore('big-user', () => {
  // 一、定义token-state
  const token = ref('')
  // 、定义token-state方法:
  // ①赋值
  const setToken = (newToken) => {
    token.value = newToken
  }
  // ②删除
  const removeToken = () => {
    token.value = ''
  }

  // 一、定义user-state  同上
  const user = ref({})
  const getUser = async () => {
    const res = await userGetInfoService()
    user.value = res.data.data
  }

  const setUser = (obj) => {  //也可以用作删除用户数据，直接传空对象即可
    user.value = obj
  }

  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
}, {
  persist: true,
})