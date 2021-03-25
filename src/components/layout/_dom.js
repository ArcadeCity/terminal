import Head from 'next/head'
import useStore from '@/helpers/store'
import { ArcadeUI } from '@arcadecity/ui'

export const Header = () => (
  <Head>
    <title>Arcade City Terminal</title>
    <link rel='shortcut icon' href='/icons/favicon.ico' />
    <link rel='preconnect' href='https://fonts.gstatic.com' />
    <link
      href='https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap'
      rel='stylesheet'
    />
  </Head>
)

const Dom = ({ dom }) => {
  const events = useStore((s) => s.events)
  events && delete events.onGotPointerCaptureLegacy // https://github.com/pmndrs/react-three-fiber/issues/462#issuecomment-653227107
  return (
    <ArcadeUI>
      <div className='absolute top-0 left-0 right-0 z-20 dom' {...events}>
        <Header />
        {dom}
      </div>
    </ArcadeUI>
  )
}

export default Dom
