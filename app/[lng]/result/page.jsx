'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Result, Button } from 'antd'
import Banner from './../components/Banner'
import { getResult } from '@/api/checkout'

export default function Page() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''
  const platform = searchParams.get('platform') || ''
  const transactionId = searchParams.get('token') || ''

  console.log(orderId, platform, transactionId) // 打印 URL 中的 orderId 参数

  const [result, setResult] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResult({
          platform: platform,
          orderId: orderId,
          transactionId: transactionId,
        })
        console.log('getResult', data)

        const result = data.result ? 1 : 2
        setResult(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (orderId === '' || platform === '' || transactionId === '') {
      console.error('Missing orderId, platform, or transactionId')
      return
    }
    fetchData()
  }, [])

  const router = useRouter()
  const handleOnClick = (url) => {
    router.push(url)
  }

  return (
    <>
      <div className="mt-2">
        <Banner />
      </div>

      {result == 0 && <Result title="Payment result inquires"></Result>}

      {result == 1 && (
        <Result
          status="success"
          title="Payment successful"
          subTitle={`Merchant Order Number: ${orderId}`}
        >
          {[
            <Button
              type="primary"
              key="order"
              onClick={() => handleOnClick('/order')}
              style={{ backgroundColor: '#1677ff' }}
            >
              Order History
            </Button>,
            <Button
              key="buy"
              className="ml-2"
              onClick={() => handleOnClick('/')}
            >
              Purchase Again
            </Button>,
          ]}
        </Result>
      )}

      {result == 2 && (
        <Result
          status="error"
          title="Payment Failure"
          subTitle={`Merchant Order Number: ${orderId}`}
        >
          {[
            <Button
              type="primary"
              key="console"
              onClick={() => handleOnClick('/order')}
            >
              Order History
            </Button>,
            <Button
              key="buy"
              className="ml-2"
              onClick={() => handleOnClick('/')}
            >
              Purchase Again
            </Button>,
          ]}
        </Result>
      )}
    </>
  )
}
