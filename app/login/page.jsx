'use client'

import React, { useState, useEffect } from 'react'
import { Button, Result } from 'antd'
import { getMemberTest } from '../../api/member'

export default function LoginTest() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberTest()
        setVisible(false)
        console.log('getMemberTest', data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

    return () => {
      // 可选的清理逻辑，例如取消请求或清除定时器
    }
  }, []) // 传递空数组作为依赖项，以确保只在组件挂载时获取数据

  return (
    <Result
      status="success"
      title="Login Successfully!"
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  )
}
