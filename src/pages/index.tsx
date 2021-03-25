import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import useStore from '@/helpers/store'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => {
  useStore.setState({ title: 'Arcade City Terminal' })
  return (
    <>
      <GridBackground r3f />
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <div className='bg-purple bg-opacity-80 p-12 text-center rounded-lg flex flex-col justify-center items-center'>
          <h1>Terminal Login</h1>
          <Link href='/box'>
            <button>Dummy login</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page
