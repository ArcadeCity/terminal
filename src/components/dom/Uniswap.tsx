import { useState } from 'react'
import styled from 'styled-components'
import ReactSlider from 'react-slider'
import { Button, Card, Text } from '@arcadecity/ui'
import { MyBalances } from '@/components/dom/token/MyBalances'
import { useStore } from '@/store'
import {} from '@/utilities/'

export const Uniswap = () => {
  const [value, setValue] = useState<number>(0.05)
  const magicUser = useStore((s) => s.magicUser)
  const balances = useStore((s) => s.balances)
  // const ethWalletConnected = magicUser && magicUser.publicAddress
  // const hasArcd = balances && balances.ARCD > 0
  const attemptSwap = () => {
    const ethBalance = parseFloat(balances.ETH)
    console.log('purchase attempt is', value)
    console.log('balance is ', ethBalance)
    if (value > ethBalance) {
      alert(`Not enough ETH. Your balance is ${ethBalance}`)
      return false
    }
  }

  const ethInUsd = balances ? Math.round(value * balances.ethPrice) : '--'

  return (
    <div className='mt-16'>
      <MyBalances balances={balances} />
      <Card
        title='Swap ETH for ARCD'
        className='mt-12 w-128 text-center flex flex-col items-center justify-center'
        style={{ width: 500 }}
      >
        <Text className='mb-8'>
          Drag the slider to select how much ETH to swap for ARCD. Trades are
          made via the ARCD-ETH pool on Uniswap. ETH gas prices are not included
          in the dollar estimate and could cost ~$50 or more depending on
          network congestion.
        </Text>
        <StyledSlider
          value={value}
          onChange={(val) => {
            if (typeof val !== 'number') return
            setValue(val)
          }}
          defaultValue={0.025}
          step={0.025}
          min={0.025}
          max={1}
          renderTrack={Track}
          renderThumb={Thumb}
        />
        <Button onClick={attemptSwap}>
          Swap {value} ETH {`(~$${ethInUsd})`} for ARCD
        </Button>
        <p className='my-4'>or</p>
        <a
          href='https://info.uniswap.org/pair/0xa2e10137dbe88a10dd197f24efa403f0036e4f70'
          target='_blank'
        >
          <Button>Trade on Uniswap</Button>
        </a>
      </Card>
    </div>
  )
}

const StyledSlider = styled(ReactSlider)`
  width: 400px;
  height: 25px;
  margin: 0px auto 35px;
`

const StyledThumb = styled.div`
  height: 40px;
  margin-top: -8px;
  line-height: 25px;
  width: 40px;
  text-align: center;
  background-color: #1c133a;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  outline: none;
`

const Thumb = (props, state) => (
  <StyledThumb {...props}>
    <h6 style={{ marginTop: 6 }}>{state.valueNow}</h6>
  </StyledThumb>
)

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2
      ? '#f00'
      : props.index === 1
      ? 'rgba(0,0,0,0.1)'
      : '#AE30FF'};
  border-radius: 999px;
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />
