'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Result } from 'antd'
import { getMemberInfo } from '../../api/member'

export default function Page() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const platform = searchParams.get('platform') || ''
  console.log(code, platform)

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberInfo({
          platform: platform,
          code: decodeURIComponent(code),
        })
        console.log('getMemberInfo', data)
        setVisible(false)

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
    }, 3000)
  }, [])

  return <Result status="success" title="Login Successfully!" />
}
