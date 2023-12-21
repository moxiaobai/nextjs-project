import React from 'react'
import { Descriptions } from 'antd'
const userItems = [
  {
    key: 'name',
    label: 'UserName',
    children: 'Roy',
  },
  {
    key: 'email',
    label: 'Email',
    children: 'xiaogang622124@gmail.com',
  },
  {
    key: 'github',
    label: 'Github',
    children: 'https://github.com/moxiaobai',
  },
  {
    key: 'blog',
    label: 'Blog',
    children: 'https://momobaba.top',
  },
]

const technicalItems = [
  {
    key: 'Back',
    label: 'Backend',
    children: 'PHP(laravel)、Python(Flask)、Go(Gin)',
  },
  {
    key: 'Front',
    label: 'Frontend',
    children: 'Vue(Nuxt)、React(Nextjs)',
  },
]

export default function Page() {
  return (
    <>
      <Descriptions className="mt-8" title="User Info" items={userItems} />
      <Descriptions title="technical ability" items={technicalItems} />
    </>
  )
}
