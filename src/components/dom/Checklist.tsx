import { ArcadeUI, Blockquote, Button, Card, List, Text } from '@arcadecity/ui'
import { Navbar } from '@/components/dom'
import { Header } from '@/components/layout/_dom'

export const Checklist = () => {
  return (
    <ArcadeUI>
      <Header />
      <Navbar />
      <div className='-mt-32 flex flex-col h-screen w-screen justify-center items-center'>
        <Card title='Onboarding' className='max-w-md '>
          <List className='mb-0 px-12 space-y-1 text-lg'>
            <li>
              <Text>Verify email address</Text>
            </li>
            <li>
              <Text>Connect ETH wallet</Text>
            </li>
            <li>
              <Text>Connect AR wallet</Text>
            </li>
            <li>
              <Text>Get Arcade Tokens</Text>
            </li>
            <li>
              <Text>Select username</Text>
            </li>
            <li>
              <Text>Say hello in chat</Text>
            </li>
          </List>
        </Card>
      </div>
    </ArcadeUI>
  )
}
