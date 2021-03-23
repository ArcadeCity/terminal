import { useEffect } from 'react'
import { ArcadeUI } from '@arcadecity/ui'
import useStore from '@/helpers/store'
import { Arweave, MagicLogin } from '@/components/dom'
import { Header } from '@/components/layout/_dom'

const Page = ({ title }) => {
  const user = useStore((state) => state.magicUser)
  useEffect(() => {
    if (!process.browser || !user) return
    useStore.setState({ title })
  }, [user])
  return user ? (
    <ArcadeUI>
      <Header />
      <MagicLogin />
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
