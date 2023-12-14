import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '../lib/AntdRegistry';
import './globals.css'

import Footer from '../components/Footer';
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Next学习',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className}>
      <Header />
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
