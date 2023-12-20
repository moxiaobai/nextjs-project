'use client'

import React, { useState, useEffect, use } from 'react'
import { Divider, Col, Row, Card, Button, Modal, Tooltip, Spin } from 'antd'
import { getChannel, getGoods } from '@/api/store'
import { order, getResult } from '@/api/checkout'

export default function Checkout() {
  const iso = 'US'
  const [channel, setChannel] = useState([])
  const [channelId, setChannelId] = useState(0)
  const [loadingChannel, setLoadingChannel] = useState(true)

  const [goods, setGoods] = useState([])
  const [goodsId, setGoodsId] = useState(0)
  const [loadingGoods, setLoadingGoods] = useState(true)

  const [paidInfo, setPaidInfo] = useState({ amount: 0, currency: '' })
  const [isDisabledPay, setIsDisabledPay] = useState(true)

  const [isShowResult, setIsShowResult] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [resultMsg, setResultMsg] = useState('Recharging~~~~')
  const [resultIntervalId, setResultIntervalId] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChannel({ iso: iso })

      let payChannel = []
      if ('channel' in data) {
        data.channel.forEach((item) => {
          let tip = ''
          switch (item.name) {
            case 'paypal':
              tip =
                'Email: sb-pd6hr28292776@personal.example.com Password:Abcd123456'
              break
            case 'stripe':
              tip =
                'NUMBER: 4242424242424242  CVC: Any 3 digits  DATE: Any future date'
              break
            default:
              break
          }

          payChannel.push({
            id: item.id,
            channelId: item.channelId,
            name: item.name,
            pic: '/img/' + item.name + '.png',
            tip: tip,
          })
        })
      }

      setChannel(payChannel)
      setLoadingChannel(false)

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
    setLoadingGoods(true)
    setIsDisabledPay(true)

    const data = await getGoods({
      iso: iso,
      id: channel.id,
    })
    setGoods(data)
    setLoadingGoods(false)
    setIsDisabledPay(false)

    if (data.length > 0) {
      setGoodsId(data[0].goodsId)
      setPaidInfo({ amount: data[0].paidAmount, currency: data[0].currency })
    }
  }

  function onSelectGoods(goods) {
    console.log('onSelectGoods', goods)
    setGoodsId(goods.goodsId)
    setPaidInfo({ amount: goods.paidAmount, currency: goods.currency })
    setIsDisabledPay(false)
  }

  async function onPay() {
    setIsDisabledPay(true)

    const body = {
      iso: iso,
      goodsId: goodsId,
      channelId: channelId,
      quantity: 1,
      site: 'next',
    }
    console.log('body', body)

    const data = await order(body)
    console.log('order', data)

    window.open(data.paymentUrl, '_blank')
    setIsShowResult(true)
    setOrderId(data.orderId)

    const intervalId = setInterval(() => {
      payResult(data.orderId)
    }, 5000)
    setResultIntervalId(intervalId)

    setTimeout(() => {
      clearInterval(resultIntervalId)
    }, 30000)
  }

  async function payResult(orderId) {
    console.log('orderId', orderId)
    const data = await getResult({ orderId: orderId })
    console.log('getPayResult', data)
    if (data.result) {
      clearInterval(resultIntervalId)
      setResultMsg('Recharge Success!')
    }
  }

  function onOk() {
    setIsShowResult(false)
    setIsDisabledPay(false)

    if (resultIntervalId != 0) {
      clearInterval(resultIntervalId)
    }
  }

  return (
    <>
      <Divider orientation="left" plain>
        支付渠道
      </Divider>
      {loadingChannel && <Spin size="large" />}
      {!loadingChannel && (
        <Row gutter={16}>
          {channel.map((item) => (
            <Col span={12} className="p-2" key={item.name}>
              <Tooltip title={item.tip}>
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
              </Tooltip>
            </Col>
          ))}
        </Row>
      )}
      <Divider orientation="left" plain>
        商品列表
      </Divider>
      {loadingGoods && <Spin size="large" />}
      {!loadingGoods && (
        <Row gutter={16}>
          {goods.map((item) => (
            <Col
              xl={{ span: 6 }}
              md={{ span: 12 }}
              className="p-2"
              key={item.goodsId}
            >
              <Card
                onClick={() => onSelectGoods(item)}
                title={item.goodsName}
                className={`bg-gray-50 rounded-lg cursor-pointer ${
                  goodsId == item.goodsId ? 'border-yellow-700' : ''
                }`}
              >
                <p>
                  {item.currency} {item.paidAmount}
                </p>
                {item.discount > 0 && item.discount < 100 && (
                  <p>Discount: {item.discount}%</p>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Divider orientation="left" plain>
        支付详情
      </Divider>
      <div
        className="flex m-3 p-4 border rounded-lg bg-white"
        style={{
          position: 'sticky',
          opacity: 1,
          bottom: 0,
          zIndex: 10,
          transition: 'opacity 0.5s',
        }}
      >
        <Row gutter={16}>
          <Col flex="auto">
            <p>
              总价: {paidInfo.currency} {paidInfo.amount}
            </p>
            <p>This price does not include tax</p>
          </Col>
          <Col flex="auto">
            <Button
              block
              type="primary"
              size="large"
              onClick={onPay}
              loading={isDisabledPay}
              disabled={isDisabledPay}
              className="ml-6"
            >
              支付
            </Button>
          </Col>
        </Row>
      </div>

      <Modal open={isShowResult} title="支付结果" onOk={onOk} onCancel={onOk}>
        <p>{resultMsg}</p>
        <p>订单号: {orderId}</p>
      </Modal>
    </>
  )
}
