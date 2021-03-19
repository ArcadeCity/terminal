import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import { MagicLogin } from '@/components/dom/MagicLogin'

const Home = dynamic(() => import('@/components/canvas/Home'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
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
