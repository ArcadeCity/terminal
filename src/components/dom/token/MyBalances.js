import React from 'react'
import { CoinBalance } from './CoinBalance'

export const MyBalances = ({ balances }) => {
  console.log('so balances:', balances)
  if (!balances)
    return (
      <div className='flex flex-col items-center'>
        <div className='max-w-xl w-full sm:w-112 opacity-50 space-y-6 bg-purple p-6 my-2 rounded-lg border-2 border-minsk'>
          <CoinBalance symbol='ARCD' balance={0} price={0} />
          <CoinBalance symbol='ETH' balance={0} price={0} />
        </div>
      </div>
    )
  return (
    <div className='flex flex-col items-center'>
      {/* <h5 className='mt-8'>ARCD & ETH Balances</h5> */}
      <div className='mt-8 max-w-xl w-full sm:w-112 space-y-6 bg-purple p-6 my-2 rounded-lg border-2 border-minsk'>
        <CoinBalance
          symbol='ARCD'
          balance={balances.ARCD}
          price={balances.arcdPrice.toFixed(6)}
        />
        <CoinBalance
          symbol='ETH'
          balance={parseFloat(parseFloat(balances.ETH).toFixed(6))}
          price={balances.ethPrice}
        />
      </div>
    </div>
  )
}
