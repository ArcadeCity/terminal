import React from 'react'

const COINS = {
  ARCD: {
    name: 'Arcade Token',
  },
  ETH: {
    name: 'Ethereum',
  },
}

export const CoinBalance = ({ balance, price = 0.004, symbol }) => {
  const totalPrice = numberWithCommas((balance * price).toFixed(2))
  const prettyBalance = balance
  // const prettyBalance = symbol === 'ARCD' ? numberWithCommas(balance) : balance
  const coin = COINS[symbol]
  return (
    <div className='flex flex-row justify-between w-full'>
      <div className='flex flex-row'>
        <div className='w-16 mr-6 flex justify-center items-center'>
          <img
            className='border-0 mb-0 h-16 object-contain'
            src={`/img/${symbol}.png`}
          />
        </div>
        <div className='flex flex-col justify-center'>
          <div className='font-bold text-moonraker'>{coin.name}</div>
          <div className='text-moonraker'>{`$${price}`}</div>
        </div>
      </div>
      <div className='flex flex-col justify-center text-right'>
        <div className='font-bold text-moonraker'>{`${prettyBalance} ${symbol}`}</div>
        <div className='text-moonraker'>{`$${totalPrice}`}</div>
      </div>
    </div>
  )
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
