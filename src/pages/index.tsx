import { useEffect } from 'react'
import { ArcadeUI } from '@arcadecity/ui'
import useStore from '@/helpers/store'
import { Arweave, MagicLogin } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
import { MyBalances } from '@/components/dom/token/MyBalances'

const Page = ({ title }) => {
  const user = useStore((s) => s.magicUser)
  const balances = useStore((s) => s.balances)
  useEffect(() => {
    if (!process.browser || !user) return
    useStore.setState({ title })
  }, [user])
  return user ? (
    <ArcadeUI>
      <Header />
      <MagicLogin />
      <div className='mt-16'>
        <MyBalances balances={balances} />
      </div>
      <Arweave />
    </ArcadeUI>
  ) : (
    <ArcadeUI>
      <Header />
      <MagicLogin />
    </ArcadeUI>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Arcade City',
    },
  }
}
