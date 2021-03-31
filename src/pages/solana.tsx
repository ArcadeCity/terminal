import { ArcadeUI, Card, List, Text } from '@arcadecity/ui'
import { Arweave, Navbar } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { Solana } from '@/components/dom/Solana'
import { LoginBox } from '@/ui'
import { useStore } from '@/store'
import {
  AccountsProvider,
  ConnectionProvider,
  MarketProvider,
  WalletProvider,
} from '@/contexts'

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
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <ArcadeUI>
                  <Header />
                  <Navbar />
                  <div className='-mt-32 flex flex-col h-screen w-screen justify-center items-center'>
                    <Solana />
                  </div>
                </ArcadeUI>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      ) : (
        <LoginBox useStore={useStore} />
      )}
    </>
  )
}

export default Page
