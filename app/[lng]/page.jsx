'use client'

import Banner from './components/Banner'
import Checkout from './components/Checkout'

export default function Home({ params: { lng } }) {
  return (
    <div className="flex flex-col">
      <Banner />

      <Checkout lng={lng} />
    </div>
  )
}
