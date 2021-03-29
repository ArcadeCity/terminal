import { Card, List, Text } from '@arcadecity/ui'
import { useStore } from '@/store'

export const Checklist = () => {
  const magicUser = useStore((s) => s.magicUser)
  const arAddress = useStore((s) => s.arAddress)
  const ethAddress = useStore((s) => s.ethAddress)
  const balances = useStore((s) => s.balances)

  const verifiedEmail = magicUser && magicUser.email
  const ethWalletConnected = !!ethAddress
  const hasArcd = balances && balances.ARCD > 0

  const doneClasses = 'opacity-50 line-through'
  return (
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
          <Text>
            <span className={hasArcd ? doneClasses : ''}>
              Get Arcade Tokens
            </span>
          </Text>
        </li>
        <li>
          <Text>Complete intro quest</Text>
        </li>
        <li>
          <Text>Say hello in chat</Text>
        </li>
      </List>
    </Card>
  )
}
