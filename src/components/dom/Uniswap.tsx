import { useState } from 'react'
import styled from 'styled-components'
import ReactSlider from 'react-slider'
import { Card, List, Text } from '@arcadecity/ui'
import { MyBalances } from '@/components/dom/token/MyBalances'
import { useStore } from '@/store'

export const Uniswap = () => {
  const [value, setValue] = useState<number | number[]>(0.1)
  const magicUser = useStore((s) => s.magicUser)
  const balances = useStore((s) => s.balances)
  // const ethWalletConnected = magicUser && magicUser.publicAddress
  // const hasArcd = balances && balances.ARCD > 0

  return (
    <>
      <MyBalances balances={balances} />
      <Card title='Swap ETH for ARCD' className='mt-12 max-w-lg'>
        <StyledSlider
          value={value}
          onChange={(val) => {
            setValue(val)
          }}
          defaultValue={0.3}
          step={0.1}
          min={0.1}
          max={5}
          renderTrack={Track}
          renderThumb={Thumb}
        />
      </Card>
    </>
  )
}

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  outline: none;
`

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
)

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#ddd'};
  border-radius: 999px;
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />
