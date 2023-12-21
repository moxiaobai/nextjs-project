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
    children: (
      <a href="https://github.com/moxiaobai" target="_blank">
        https://github.com/moxiaobai
      </a>
    ),
  },
  {
    key: 'blog',
    label: 'Blog',
    children: (
      <a href="https://momobaba.top" target="_blank">
        https://momobaba.top
      </a>
    ),
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

const projectItems = [
  {
    key: 'next',
    label: 'Next',
    children: (
      <a href="https://nextjs.momobaba.top" target="_blank">
        https://nextjs.momobaba.top
      </a>
    ),
  },
  {
    key: 'nuxt',
    label: 'Nuxt',
    children: (
      <a href="https://nuxtjs.momobaba.top" target="_blank">
        https://nuxtjs.momobaba.top
      </a>
    ),
  },
]

export default function Page() {
  return (
    <>
      <div className="mb-3 mt-8">
        <Descriptions title="User Info" items={userItems} />
      </div>
      <div className="mb-6 mt-8">
        <Descriptions title="Technical Ability" items={technicalItems} />
      </div>

      <Descriptions title="Project" items={projectItems} />
    </>
  )
}
