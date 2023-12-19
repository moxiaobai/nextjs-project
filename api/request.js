import axios from 'axios'
import { signFormat } from '../utils/sign'
import { encrypt } from '../utils/crypto'
import { message } from 'antd';


// 创建axios实例
export const Http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 30000,
})

// 添加请求拦截器
Http.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    // console.log("token", localStorage.getItem("accessToken"))
    config.headers['TOKEN'] = localStorage.getItem("accessToken")
  }

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
      (typeof window !== 'undefined') && message.error('操作过于频繁提示');
      return false
    }

    if (response.data.rtncode === 'SUCCESS') {
      return response.data.rspdata
    } else {
      (typeof window !== 'undefined') && message.error(response.data.rtnmsg);
      return []
    }
  },
  error => {
    (typeof window !== 'undefined') && message.error(error.message);
    return []
  })
