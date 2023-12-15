'use client'

import React, { useState, useEffect } from 'react'
import { Divider, Col, Row, Card } from 'antd'
import { getChannel, getGoods } from '../api/store'

export default function Checkout() {
  const iso = 'US'
  const [channel, setChannel] = useState([])
  const [channelId, setChannelId] = useState(0)
  const [goods, setGoods] = useState([])
  const [goodsId, setGoodsId] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChannel({ iso: iso })

      let payChannel = []
      data.channel.forEach((item) => {
        payChannel.push({
          id: item.id,
          channelId: item.channelId,
          name: item.name,
          pic: '/img/' + item.name + '.png',
        })
      })

      setChannel(payChannel)

      if (channelId == 0 && payChannel.length > 0) {
        setChannelId(payChannel[0].channelId)
        onSelectChannel(payChannel[0])
      }
    }

    fetchData()
  }, [])

  async function onSelectChannel(channel) {
    console.log('onSelectChannel', channel)
    setChannelId(channel.channelId)

    const data = await getGoods({
      iso: iso,
      id: channel.id,
    })

    setGoods(data)

    if (data.length > 0) {
      setGoodsId(data[0].goodsId)
    }
  }

  function onSelectGoods(goods) {
    console.log('onSelectGoods', goods)
    setGoodsId(goods.goodsId)

    // paidInfo.currency = goods.currency
    // paidInfo.goodsAmount = goods.goodsAmount

    // isDisabledPay.value = false
  }

  return (
    <>
      <Divider orientation="left" plain>
        支付渠道
      </Divider>
      <div className="flex flex-wrap">
        <Row>
          {channel.map((item) => (
            <Col span={12} className="p-2" key={item.name}>
              <div
                className={`border rounded-lg cursor-pointer ${
                  channelId == item.channelId ? 'border-yellow-700' : ''
                }`}
              >
                <img
                  onClick={() => onSelectChannel(item)}
                  alt={item.name}
                  src={item.pic}
                  className="bg-white rounded-lg"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Divider orientation="left" plain>
        商品列表
      </Divider>
      <div className="flex flex-wrap">
        <Row>
          {goods.map((item) => (
            <Col span={12} className="p-2" key={item.goodsId}>
              <Card
                title={item.goodsName}
                className={`bg-gray-50 rounded-lg cursor-pointer ${
                  goodsId == item.goodsId ? 'border-yellow-700' : ''
                }`}
              >
                <p>
                  {item.currency} {item.goodsAmount}
                </p>
                {item.discount > 0 && item.discount < 100 && (
                  <p>Discount: {item.discount}%</p>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
