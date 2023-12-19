'use client'

import React, { useState, useEffect } from 'react'
import { getRecord } from '@/api/checkout'
import Banner from '@/components/Banner'
import { Table } from 'antd'
import moment from 'moment'

export default function Page() {
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Order No.',
      dataIndex: 'orderId',
    },
    {
      title: 'Channel',
      dataIndex: 'channelID',
      render: (text) => {
        switch (text) {
          case 26:
            return 'paypal'
          case 45:
            return 'stripe'
        }
      },
    },
    {
      title: 'Amount',
      className: 'column-money',
      dataIndex: 'paidAmount',
      render: (text, record) => {
        return text / 100 + ' ' + record.paidCurrency
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (text) => {
        const date = new Date(text * 1000)
        return moment(date).format('YYYY-MM-DD HH:mm')
      },
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecord()
        console.log('getResult', data)
        //遍历data, 并新增键值key
        data.forEach((item, index) => {
          item.key = item.id
        })

        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="mt-2 mb-5">
        <Banner />
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  )
}
