import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { ArcadeUI } from '@arcadecity/ui'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => {
  return (
    <ArcadeUI>
      <GridBackground r3f />
      <h1>Test</h1>
    </ArcadeUI>
  )
}

export default Page
