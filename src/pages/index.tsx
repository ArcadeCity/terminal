import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { LoginBox } from '@/ui'
import { useStore } from '@/store'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => {
  return (
    <>
      <GridBackground r3f />
      <LoginBox useStore={useStore} />
    </>
  )
}

export default Page
