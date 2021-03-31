import { useCallback } from 'react'
import styled from 'styled-components'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button, List } from '@arcadecity/ui'
import { useStore } from '@/store'
import { useConnection, useWallet } from '@/contexts'
import { ConnectButton } from '@/components/ConnectButton'
import { Account, Connection } from '@solana/web3.js'

export const Solana = () => {
  const actions = useStore((s) => s.actions)

  const connection = useConnection()
  const { publicKey } = useWallet()

  // console.log('connection:', connection)
  console.log('publicKey:', publicKey)

  const airdrop2 = async () => {
    console.log('testing airdrop')
    const connection = new Connection('https://testnet.solana.com')
    console.log(connection)
    // connection.onSlotChange((change) => {
    //   console.log('onSlotChange:', change)
    // })

    const payerAccount = new Account()
    console.log(payerAccount)

    connection.onAccountChange(payerAccount.publicKey, (change) => {
      console.log('onAccountChange:', change)
    })

    const res = await connection.requestAirdrop(
      payerAccount.publicKey,
      1 * LAMPORTS_PER_SOL
    )
    console.log(res)

    setTimeout(async () => {
      const res2 = await connection.requestAirdrop(
        payerAccount.publicKey,
        1 * LAMPORTS_PER_SOL
      )
      console.log(res2)
    }, 2000)
  }

  const airdrop = useCallback(() => {
    console.log(`Requesting airdrop to ${publicKey}`)
    if (!publicKey) {
      return
    }

    connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL).then(() => {
      console.log('ACCOUNT FUNDED!')
    })
  }, [publicKey, connection])

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
        <Button palette='secondary' onClick={airdrop2}>
          Airdrop
        </Button>
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
