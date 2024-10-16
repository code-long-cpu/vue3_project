<script setup>
import { getArticleServive } from '@/api/article.js'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getchannelList = async () => {
  const res = await getArticleServive()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getchannelList()
</script>

<template>
  <!-- element-plus的el-select通过v-model控制显示某个el-option选项 -->
  <el-select style="width: 240px" :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <!-- $event就是value值 -->
    <el-option v-for="channel in channelList" :key="channel.id" :label="channel.cate_name"
      :value="channel.id"></el-option>
  </el-select>
</template>