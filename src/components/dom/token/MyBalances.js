import React from 'react'
import { Card } from '@arcadecity/ui'
import { CoinBalance } from './CoinBalance'

export const MyBalances = ({ balances }) => {
  if (!balances)
    return (
      <div className='flex flex-col items-center text-center'>
        <Card title='Fetching ETH Balances' style={{ width: 500 }}>
          <div className='max-w-md w-full sm:w-112 opacity-50 space-y-6 bg-purple p-6 my-2 rounded-lg border-2 border-minsk'>
            <CoinBalance symbol='ARCD' balance={0} price={0} />
            <CoinBalance symbol='ETH' balance={0} price={0} />
          </div>
        </Card>
      </div>
    )
  return (
    <div className='flex flex-col items-center text-center'>
      <Card title='ETH Balances' style={{ width: 500 }}>
        <div className='text-left max-w-md w-full sm:w-112 space-y-6 bg-purple p-6 my-2 rounded-lg border-2 border-minsk'>
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
      </Card>
    </div>
  )
}
