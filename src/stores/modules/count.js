import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore('big-count', () => {
  // 一、定义state
  const count = ref(0)
  // 二、修改state:
  // ①赋值
  const addCount = (newvalue) => {
    count.value += newvalue
  }
  const subCount = (newvalue) => {
    count.value -= newvalue
  }

  return {
    count,
    addCount,
    subCount
  }
})