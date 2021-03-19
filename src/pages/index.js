import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import { Arweave, MagicLogin } from '@/components/dom'

const Home = dynamic(() => import('@/components/canvas/Home'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <Arweave />
      <MagicLogin />
      <Home r3f />
    </>
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
