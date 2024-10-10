import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块token settoken removetoken
export const useUserStore = defineStore('big-user', () => {
  // 一、定义state
  const token = ref('')
  // 二、修改state:
  // ①赋值
  const setToken = (newToken) => {
    token.value = newToken
  }
  // ②删除
  const removeToken = () => {
    token.value = ''
  }
  return {
    token,
    setToken,
    removeToken
  }
}, {
  persist: true,
})