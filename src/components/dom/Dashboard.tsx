import { ArcadeUI } from '@arcadecity/ui'
import { Arweave, Navbar, Ramp } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
import { MyBalances } from '@/components/dom/token/MyBalances'
import { useStore } from '@/store'

export const Dashboard = () => {
  const balances = useStore((s) => s.balances)
  return (
    <ArcadeUI>
      <Header />
      <Navbar />
      <div className='mt-16'>
        <MyBalances balances={balances} />
      </div>
      <Ramp />
      <Arweave />
      <p className='mt-8 text-center italic'>
        This is alpha software. Please do not store large amounts in connected
        wallets.
      </p>
    </ArcadeUI>
  )
}
