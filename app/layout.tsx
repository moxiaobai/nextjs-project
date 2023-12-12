import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '../lib/AntdRegistry';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Next学习',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
