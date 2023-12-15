import Banner from '../components/Banner'
import Checkout from '../components/Checkout'

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="mt-2">
        <Banner />
      </div>

      <Checkout />
    </div>
  )
}
