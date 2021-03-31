import { useState } from 'react'
import styled from 'styled-components'
import ReactSlider from 'react-slider'
import { Button, Card, List, Text } from '@arcadecity/ui'
import { MyBalances } from '@/components/dom/token/MyBalances'
import { useStore } from '@/store'
import {} from '@/utilities/'

export const Solana = () => {
  const [value, setValue] = useState<number>(0.05)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const balances = useStore((s) => s.balances)
  const uniswapTx = useStore((s) => s.uniswapTx)
  const actions = useStore((s) => s.actions)
  const attemptSwap = async () => {
    setSubmitting(true)
    // alert('Transaction submitted')
    await actions.swapEthForArcd({ eth: value })
    setSubmitting(false)
  }

  const ethInUsd = balances ? Math.round(value * balances.ethPrice) : '--'

  return (
    <div className='mt-12' style={{ width: 500 }}>
      <h1 className='mb-8'>Pay Player</h1>
      <Container>
        <h6>User to pay:</h6>
        <Input placeholder='Search by username' />
        <h6>Amount:</h6>
        <Input placeholder='Amount to pay' />
        <h6>Currency:</h6>
        <List>
          <li>Dollars (USDC-SOL)</li>
          <li>Bitcoin (BTC)</li>
          <li>Ether (ETH)</li>
          <li>Arcade Token (ARCD)</li>
          <li>Arcade City Profit-Sharing Token (ARCADE)</li>
          <li>Arweave (AR)</li>
        </List>
        <Note>You will send 6 USDC and pay a fee of 0.05 USDC.</Note>
        <Button palette='secondary' onClick={() => alert('juggs gotcha')}>
          Send
        </Button>
      </Container>
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
    // @ts-ignore
    props.index === 2
      ? '#f00'
      : // @ts-ignore
      props.index === 1
      ? 'rgba(0,0,0,0.1)'
      : '#AE30FF'};
  border-radius: 999px;
`

const Note = styled.p`
  margin: 40px 0 30px;
  font-style: italic;
`

const Container = styled.div`
  margin-top: 20px;
  margin-left: 40px;
  max-width: 400px;
`

const Input = styled.input`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 1px;
  border-radius: 100px;
  padding: 14px 60px 14px 25px;
  background: rgb(24, 24, 24);
  border: 1px solid rgba(255, 167, 108, 0.7);
  width: 100%;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 4px inset;
  outline: none;
  margin-bottom: 30px;
`
