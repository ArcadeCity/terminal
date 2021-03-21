import { ArcadeUI } from '@arcadecity/ui'
import useStore from '@/helpers/store'
import { Arweave, MagicLogin } from '@/components/dom'
import { Header } from '@/components/layout/_dom'

const Page = ({ title }) => {
  useStore.setState({ title })
  const user = useStore((state) => state.user)
  console.log('user:', user)
  return (
    <ArcadeUI>
      <Header />
      <Arweave />
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
