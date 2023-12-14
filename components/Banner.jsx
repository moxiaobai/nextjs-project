import React from 'react'
import { Carousel } from 'antd'
import { getBannerList } from '../api/activity'

export default async function Banner() {
  const data = await getBannerList()
  console.log('data', data)
  return (
    <Carousel autoplay effect="fade">
      {data.map((item) => (
        <div className="p-1">
          <div
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(${item.picture})`,
            }}
            className="p-20 rounded-3xl"
            key={item.id}
          ></div>
        </div>
      ))}
    </Carousel>
  )
}
