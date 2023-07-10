import axios from 'axios'
import { Message } from 'element-ui'

import store from '@/router'

const BASE_API = 'http://127.0.0.1:7070'
// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
//请求头配置

// //添加请求拦截器
// service.interceptors.request.use(
//   config => {
//     return config;
//   },
//   error => {
//     //请求错误
//     return Promise.reject(error);
//   }
// );
// 响应拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   */
  response => {

    return response.data
  },
  error => {
    // console.log('err' + error) // for debug
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')) {
      Message({
        message: '请求超时，请稍后重试',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
