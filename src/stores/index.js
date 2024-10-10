// 引入pinia仓库
import { createPinia } from 'pinia'

// 持久化储存pinia数据
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(persist)

export default pinia
//导出的是一个变量或方法，实例

export * from '@/stores/modules/user' //按需导出从user中导入的所有内容
export * from '@/stores/modules/count'






