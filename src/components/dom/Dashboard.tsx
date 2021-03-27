import { ArcadeUI, Button, Card } from '@arcadecity/ui'
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

      <div className='flex flex-col mt-12 text-center items-center'>
        <Card title='Export ETH private key' style={{ maxWidth: 800 }}>
          <a
            className='mb-12'
            href='https://reveal.magic.link/arcadecity'
            target='_blank'
          >
            <Button>Export key</Button>
          </a>
        </Card>

        <p className='mt-8 italic'>
          This is alpha software. Please do not store large amounts in connected
          wallets.
        </p>
      </div>
    </ArcadeUI>
  )
}
