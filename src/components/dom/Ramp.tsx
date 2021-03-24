import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import useStore from '@/helpers/store'

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
    <div className='mt-8 flex flex-col items-center w-full text-center'>
      <h5>Buy Crypto with Ramp</h5>
      <button onClick={buy}>Buy crypto</button>
    </div>
  )
}
