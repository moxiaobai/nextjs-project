import axios from 'axios'
import { signFormat } from '../utils/sign'
import { encrypt } from '../utils/crypto'


// 创建axios实例
export const Http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 30000,
})

// 添加请求拦截器
Http.interceptors.request.use(config => {
  // config.headers['TOKEN'] = localStorage.getItem("accessToken")

  // 当前主机下的接口请求过滤
  let timestamp = new Date().getTime().toString().substring(0, 10);
  config.data = encrypt(signFormat({ ...config.data }, timestamp))

  return config
}, error => {
  // 错误拦截
  return error
})

// 添加响应拦截器
Http.interceptors.response.use(
  response => {
    if (response.status >= 400) {
      return false
    }

    if (response.data.rtncode === 'SUCCESS') {
      return response.data.rspdata
    } else {
      return []
    }
  },
  error => {
    console.error(error)
    return error
  })
