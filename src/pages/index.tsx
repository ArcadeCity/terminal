import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { LoginBox } from '@/ui'
import { useMagicUser } from '@/helpers/useMagicUser'
import { useStore } from '@/store'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => {
  useMagicUser()
  return (
    <>
      <GridBackground r3f />
      <LoginBox useStore={useStore} />
    </>
  )
}

export default Page
