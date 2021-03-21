import useStore from '@/helpers/store'
import { Arweave, MagicLogin } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
import { ArcadeUI } from '@arcadecity/ui'

const Page = ({ title }) => {
  useStore.setState({ title })
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
