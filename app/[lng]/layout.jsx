import React from 'react'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/AntdRegistry'
import './globals.css'

import { dir } from 'i18next'

import Head from './components/Head'
import Footer from './components/Footer'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children, params: { lng } }) => (
  <html lang={lng} dir={dir(lng)}>
    <Head lng={lng} />
    <body className={inter.className}>
      <Header lng={lng} />
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      <Footer lng={lng} />
    </body>
  </html>
)

export default RootLayout
