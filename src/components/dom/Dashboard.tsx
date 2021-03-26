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

      <Arweave />

      <Ramp />

      <p className='flex flex-col mt-12 text-center'>
        <h5>Export ETH private key</h5>
        <a
          className='mb-12'
          href='https://reveal.magic.link/arcadecity'
          target='_blank'
        >
          <button>Export key</button>
        </a>
        <p className='italic'>
          This is alpha software. Please do not store large amounts in connected
          wallets.
        </p>
      </p>
    </ArcadeUI>
  )
}
