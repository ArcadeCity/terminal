import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { Dashboard } from '@/components/dom/Dashboard'
import { LoginBox } from '@/ui'
import { useStore } from '@/store'

const GridBackground: ComponentType<{ r3f: boolean }> = dynamic(
  () => import('@/ui/GridBackground'),
  {
    ssr: false,
  }
)

const Page = () => {
  const magicUser = useStore((s) => s.magicUser)
  return (
    <>
      <GridBackground r3f />
      {magicUser ? <Dashboard /> : <LoginBox useStore={useStore} />}
    </>
  )
}

export default Page
