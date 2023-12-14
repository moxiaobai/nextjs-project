'use client'

import React, { useState } from 'react'
import {
  HomeOutlined,
  AppstoreOutlined,
  GooglePlusOutlined,
  GoogleOutlined,
  GlobalOutlined,
  UserOutlined,
  MailOutlined,
  BarsOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Menu, Avatar } from 'antd'
import Link from 'next/link'
import { getLoginUrl, logout } from '../api/member'

async function onLogin(platform) {
  const { data } = await getLoginUrl({ platform: platform })
  window.open(data.value.loginUrl, '_blank', 'width=500,height=500')
}

function onLoginTest() {
  window.open('/login', '_blank', 'width=500,height=500')
}

async function onLogout() {
  await logout()
}

export default function Header() {
  const [current, setCurrent] = useState('home')
  const [visible, setVisible] = useState(true)
  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="about" icon={<AppstoreOutlined />}>
        <Link href="/about">About Me</Link>
      </Menu.Item>
      <Menu.SubMenu key="lang" icon={<GlobalOutlined />} title="Language">
        <Menu.Item key="zh">简体中文</Menu.Item>
        <Menu.Item key="en">English</Menu.Item>
      </Menu.SubMenu>
      {visible && (
        <Menu.Item key="login" icon={<GooglePlusOutlined />}>
          Log in
        </Menu.Item>
      )}
      {visible && (
        <Menu.Item key="loginTest" icon={<GoogleOutlined />}>
          <Link href="/login">Login Test</Link>
        </Menu.Item>
      )}
      {!visible && (
        <Menu.SubMenu
          key="user"
          title={
            <Avatar
              shape="circle"
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            />
          }
        >
          <Menu.Item key="nickname" icon={<UserOutlined />}>
            <Link href="/about">Moxiaobai</Link>
          </Menu.Item>
          <Menu.Item key="email" icon={<MailOutlined />}>
            xiaogang@qq.com
          </Menu.Item>
          <Menu.Item key="order" icon={<BarsOutlined />}>
            <Link href="/order">订单</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  )
}
