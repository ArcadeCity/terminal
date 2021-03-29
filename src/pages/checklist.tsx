import { ArcadeUI, Card, List, Text } from '@arcadecity/ui'
import { Arweave, Navbar } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
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
  const user = useStore((s) => s.user)
  return (
    <>
      <GridBackground r3f />

      {user ? (
        <ArcadeUI>
          <Header />
          <Navbar />
          <div className='-mt-32 flex flex-col h-screen w-screen justify-center items-center'>
            <Checklist />
          </div>
        </ArcadeUI>
      ) : (
        <LoginBox useStore={useStore} />
      )}
    </>
  )
}

export default Page
