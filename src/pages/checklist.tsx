import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { Checklist } from '@/components/dom/Checklist'
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
      {magicUser ? <Checklist /> : <LoginBox useStore={useStore} />}
    </>
  )
}

export default Page
