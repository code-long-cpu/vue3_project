<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <!-- 标题父传子；给子组件绑定title属性-->
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽-定制按钮；具名插槽要配合template #name使用-->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 默认插槽定制按钮；写啥都行-->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>