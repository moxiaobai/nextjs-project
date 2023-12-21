'use client'

import React, { useState, useEffect } from 'react'
import { Result } from 'antd'
import { getMemberTest } from '../../../api/member'

export default function LoginTest() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberTest()
        setVisible(false)
        console.log('getMemberTest', data)

        if (data.hasOwnProperty('accessToken')) {
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('memberInfo', JSON.stringify(data.member))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

    setTimeout(function () {
      window.close()
    }, 2000)
  }, [])

  return <Result status="success" title="Login Successfully!" />
}
