import styled from 'styled-components'
import { Button, List } from '@arcadecity/ui'
import { useStore } from '@/store'

export const Solana = () => {
  const actions = useStore((s) => s.actions)
  const payPlayerDemo = () => {
    actions.payPlayer('metagaia', 50000, 'ARCD')
  }

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
        <Button palette='secondary' onClick={payPlayerDemo}>
          Send
        </Button>
      </Container>
    </div>
  )
}

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
