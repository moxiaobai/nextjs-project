'use client'

import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd'
import { getBannerList } from '@/api/activity'

export default function Banner() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBannerList()
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <Carousel autoplay effect="fade">
      {data.map((item) => (
        <div className="p-1" key={item.id}>
          <div
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(${item.picture})`,
            }}
            className="p-20 rounded-3xl"
          ></div>
        </div>
      ))}
    </Carousel>
  )
}
