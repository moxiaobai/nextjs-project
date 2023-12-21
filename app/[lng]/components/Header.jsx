'use client'

import React, { useState, useEffect } from 'react'
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
import { getLoginUrl, logout } from '@/api/member'
import { useTranslation } from '../../i18n/client'
import { languages, locales } from '../../i18n/settings'

async function onLogin(platform) {
  const data = await getLoginUrl({ platform: platform, site: 'next' })
  console.log('data', data)
  window.open(data.loginUrl, '_blank', 'width=500,height=500')
}

function onLoginTest() {
  window.open('/login', '_blank', 'width=500,height=500')
}

function initMember() {
  let member = {
    name: '',
    email: '',
    picture: '',
  }

  const info = localStorage.getItem('memberInfo')
  if (info && info !== 'undefined') {
    const user = JSON.parse(info)
    member.name = user.name
    member.email = user.email
    member.picture = user.picture
  }

  return member
}

export default function Header({ lng }) {
  const { t } = useTranslation(lng)

  const [visible, setVisible] = useState(true)
  const [current, setCurrent] = useState('home')
  const [member, setMember] = useState({})

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)

    switch (e.key) {
      case 'login':
        onLogin('google')
        break
      case 'loginTest':
        onLoginTest()
        break
      case 'logout':
        onLogout()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const member = initMember()
    setMember(member)
    if (member.name !== '') {
      setVisible(false)
    }
  }, [])

  useEffect(() => {
    const handleStorage = () => {
      if (localStorage.getItem('memberInfo')) {
        const member = initMember()
        setMember(member)
        if (member.name !== '') {
          setVisible(false)
        }
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  async function onLogout() {
    await logout()

    setVisible(true)
    localStorage.setItem('accessToken', '')
    localStorage.setItem('memberInfo', '')
  }

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href={`/${lng}/`}>{t('header.home')}</Link>
      </Menu.Item>
      <Menu.Item key="about" icon={<AppstoreOutlined />}>
        <Link href={`/${lng}/about`}>{t('header.about')}</Link>
      </Menu.Item>
      <Menu.SubMenu key="lang" icon={<GlobalOutlined />} title={locales[lng]}>
        {languages
          .filter((l) => lng !== l)
          .map((l) => (
            <Menu.Item key={l}>
              <Link href={`/${l}`}>{locales[l]}</Link>
            </Menu.Item>
          ))}
      </Menu.SubMenu>
      {visible && (
        <Menu.Item key="login" icon={<GooglePlusOutlined />}>
          {t('header.login')}
        </Menu.Item>
      )}
      {visible && (
        <Menu.Item key="loginTest" icon={<GoogleOutlined />}>
          Login Test
        </Menu.Item>
      )}
      {!visible && (
        <Menu.SubMenu
          key="user"
          title={<Avatar shape="circle" src={member.picture} />}
        >
          <Menu.Item key="nickname" icon={<UserOutlined />}>
            <Link href={`/${lng}/about`}>{member.name}</Link>
          </Menu.Item>
          <Menu.Item key="email" icon={<MailOutlined />}>
            {member.email}
          </Menu.Item>
          <Menu.Item key="order" icon={<BarsOutlined />}>
            <Link href={`/${lng}/order`}>{t('header.order')}</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            {t('header.logout')}
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  )
}
