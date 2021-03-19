import useStore from '@/helpers/store'
import Head from 'next/head'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

const Dom = ({ dom }) => {
  const events = useStore((s) => s.events)
  events && delete events.onGotPointerCaptureLegacy // https://github.com/pmndrs/react-three-fiber/issues/462#issuecomment-653227107
  return (
    <div className='absolute top-0 left-0 right-0 z-20 dom' {...events}>
      <Header />
      {dom}
      <h1 className='absolute w-full text-xs tracking-wider text-center text-gray-100 md:mt-56 mt-28 top-1/2 sm:subpixel-antialiased md:antialiased'>
        ARCADE CITY TERMINAL
      </h1>
    </div>
  )
}

export default Dom
