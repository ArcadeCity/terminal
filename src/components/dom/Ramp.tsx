import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

export const Ramp = () => {
  const buy = () => {
    new RampInstantSDK({
      hostAppName: 'Arcade City',
      hostLogoUrl: 'https://arcade.city/img/icon.png',
      swapAsset: 'ETH',
      url: 'https://ri-widget-staging.firebaseapp.com',
      userAddress: '0xa5c249AD3a680523B6aF014Cf737b89032b3f81c',
      userEmailAddress: 'chris@arcade.city',
      hostApiKey: process.env.NEXT_PUBLIC_RAMP_STAGING_KEY,
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
