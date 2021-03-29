import { ArcadeUI, Blockquote, Button, Card } from '@arcadecity/ui'
import { Arweave, Checklist, Navbar, Ramp, Uniswap } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
import { MyBalances } from '@/components/dom/token/MyBalances'
import { useStore } from '@/store'

export const Dashboard = () => {
  const balances = useStore((s) => s.balances)
  return (
    <ArcadeUI>
      <Header />
      <Navbar />

      <div className='mt-12 flex flex-col items-center'>
        <div className='max-w-2xl'>
          <Blockquote>
            <p className='mt-6 italic'>
              This is alpha software. Please do not store large amounts in
              connected wallets.
            </p>
          </Blockquote>
        </div>
      </div>

      <div className='flex flex-col my-8 items-center'>
        <Checklist />

        <div className='mt-8'>
          <MyBalances balances={balances} />
        </div>

        <Uniswap />
      </div>

      <Ramp />

      <div className='flex flex-col my-8 text-center items-center'>
        <Card title='Export ETH private key' style={{ maxWidth: 800 }}>
          <a
            className='mb-12'
            href='https://reveal.magic.link/arcadecity'
            target='_blank'
          >
            <Button>Export key</Button>
          </a>
        </Card>
      </div>

      <div className='mb-16'>
        <Arweave />
      </div>
    </ArcadeUI>
  )
}
