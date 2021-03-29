import { Button, Card } from '@arcadecity/ui'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { useStore } from '@/store'

export const Ramp = () => {
  const user = useStore((s) => s.user)
  const ethAddress = useStore((s) => s.ethAddress)
  if (!user || !ethAddress) return

  const buy = () => {
    new RampInstantSDK({
      hostAppName: 'Arcade City',
      hostLogoUrl: 'https://arcade.city/img/icon.png',
      swapAsset: 'ETH',
      userAddress: ethAddress,
      userEmailAddress: user.email,
      hostApiKey: process.env.NEXT_PUBLIC_RAMP_PRODUCTION_KEY,
      // url: 'https://ri-widget-staging.firebaseapp.com',
    })
      .on('*', (event) => console.log(event))
      .show()
  }
  return (
    <div className='mt-12 flex flex-col items-center w-full text-center'>
      <Card title='Buy ETH'>
        <Button onClick={buy}>Buy ETH via Ramp</Button>
      </Card>
    </div>
  )
}
