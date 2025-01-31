// // 引入anios
// import axios from 'axios'
// import { useUserStore } from '@/stores/index.js'
// // 使用elementPlus组件库，文件是 .vue 文件 不需要导包，全局自动导了；但是js文件必须导包；
// import { ElMessage } from 'element-plus'

// // js文件引入创建的路由router（js需要引入，vue组件不需要引入，与elementsplus一个原理）
// import router from '@/router'

// const baseURL = 'http://big-event-vue-api-t.itheima.net'

// // ①创建axios实例
// const instance = axios.create({
//   baseURL,  //❌过，写成了baseurl
//   timeout: 1000,
// });

// // ②请求拦截器-请求前要做的事情，携带token
// instance.interceptors.request.use(
//   (config) => {
//     // 2-1：携带token
//     // config是Axios自动传入的参数-配置对象，可以进行header的配置
//     const useStore = useUserStore() //获取仓库token值
//     if (useStore.token) {
//       config.headers.Authorization = useStore.token
//     }
//     return config; //返回给instance实例，用于发起请求

//   }, (err) => {
//     // Do something with request error
//     return Promise.reject(err);
//   });

// // ③响应拦截器 - 接收到相应后，要做的事情
// instance.interceptors.response.use(
//   (res) => {
//     // ✅请求成功返回的是res
//     // 3-1如果请求来的相应状态码code为0，则请求成功，返回res
//     // res是请求返回来的结果参数
//     if (res.data.code === 0) {
//       // console.log(res)
//       return res;
//     }
//     // 3-2如果业务处理失败，则给出错误弹窗，抛出错误res-后台提供的"身份认证失败！"
//     // ElMessage.error(res.data.message || '服务器异常')
//     ElMessage({ message: res.data.message || '服务异常', type: 'error' })
//     return Promise.reject(res.data);

//   }, (err) => {
//     // console.log(err)

//     // ElMessage.error(err.response.data.message || '服务器异常')
//     ElMessage({ message: err.response.data.message || '服务异常', type: 'error' })
//     // console.log(err)

//     //✅请求失败是返回的是respose
//     // 3-3处理401错误，401是权限不足或token不存在，或者过期，直接跳转主页
//     if (err.response?.status === 401) {
//       router.push('/login')
//     }
//     // 3-4处理默认错误，只用给提示
//     // console.log(err.response)

//     return Promise.reject(err);
//   });

// export default instance;
// export { baseURL }



import { useUserStore } from '@/stores/index.js'

import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 100000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage({ message: err.response.data.message || '服务异常', type: 'error' })
    console.log(err)
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }

