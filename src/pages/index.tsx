import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { LoginBox } from '@/ui'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => (
  <>
    <GridBackground r3f />
    <LoginBox />
  </>
)

export default Page
