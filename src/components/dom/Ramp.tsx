import { Button, Card } from '@arcadecity/ui'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { useStore } from '@/store'

export const Ramp = () => {
  const magicUser = useStore((s) => s.magicUser)
  if (!magicUser) return

  const buy = () => {
    new RampInstantSDK({
      hostAppName: 'Arcade City',
      hostLogoUrl: 'https://arcade.city/img/icon.png',
      swapAsset: 'ETH',
      userAddress: magicUser.publicAddress,
      userEmailAddress: magicUser.email,
      hostApiKey: process.env.NEXT_PUBLIC_RAMP_PRODUCTION_KEY,
      // url: 'https://ri-widget-staging.firebaseapp.com',
    })
      .on('*', (event) => console.log(event))
      .show()
  }
  return (
    <div className='mt-4 flex flex-col items-center w-full text-center'>
      <Card title='Buy ETH'>
        <Button onClick={buy}>Buy ETH via Ramp</Button>
      </Card>
    </div>
  )
}
