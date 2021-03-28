import { ArcadeUI, Card, List, Text } from '@arcadecity/ui'
import { Arweave, Navbar } from '@/components/dom'
import { Header } from '@/components/layout/_dom'
import { useStore } from '@/store'

export const Checklist = () => {
  const magicUser = useStore((s) => s.magicUser)
  const verifiedEmail = magicUser && magicUser.email
  const ethWalletConnected = magicUser && magicUser.publicAddress

  const arAddress = useStore((s) => s.arAddress)

  const doneClasses = 'opacity-50 line-through'
  return (
    <ArcadeUI>
      <Header />
      <Navbar />
      <div className='-mt-32 flex flex-col h-screen w-screen justify-center items-center'>
        <Card title='Onboarding' className='max-w-md '>
          <List className='mb-0 px-12 space-y-1 text-lg'>
            <li>
              <Text>
                <span className={verifiedEmail ? doneClasses : ''}>
                  Verify email address
                </span>
              </Text>
            </li>
            <li>
              <Text>
                <span className={ethWalletConnected ? doneClasses : ''}>
                  Connect ETH wallet
                </span>
              </Text>
            </li>
            <li>
              <Text>
                <span className={arAddress ? doneClasses : ''}>
                  Connect AR wallet
                </span>
              </Text>
            </li>
            <li>
              <Text>Get Arcade Tokens</Text>
            </li>
            <li>
              <Text>Complete intro quest</Text>
            </li>
            <li>
              <Text>Say hello in chat</Text>
            </li>
          </List>
        </Card>
        {/* <Arweave /> */}
      </div>
    </ArcadeUI>
  )
}
