import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { LoginBox } from '@/ui'
import useStore from '@/helpers/store'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => {
  const store = useStore()
  return (
    <>
      <GridBackground r3f />
      <LoginBox store={store} />
    </>
  )
}

export default Page
