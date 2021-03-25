import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import useStore from '@/helpers/store'
import { LoginBox } from '@/ui'

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
      <LoginBox />
    </>
  )
}

export default Page
