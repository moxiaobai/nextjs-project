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

        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('memberInfo', JSON.stringify(data.member))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

    setTimeout(function () {
      window.close()
    }, 300)
  }, [])

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
