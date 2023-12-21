'use client'

import { useTranslation } from '../../i18n/client'

export default function Head({ lng }) {
  const { t } = useTranslation(lng)

  return (
    <>
      <title>{t('head.title')}</title>
      <meta
        name="description"
        content="A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching."
      />
    </>
  )
}
