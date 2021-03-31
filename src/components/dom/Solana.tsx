import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Card, List } from '@arcadecity/ui'
import { PLAYERS, useStore } from '@/store'
import { Account, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import * as bip39 from 'bip39'
import nacl from 'tweetnacl'

const generateAccount = async (mnemonic) => {
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32))
  return new Account(keyPair.secretKey)
}

// const mnemonic = bip39.generateMnemonic()
// console.log('Your password:', mnemonic)

export const Solana = () => {
  const actions = useStore((s) => s.actions)

  const [connection, setConnection] = useState(
    new Connection('https://testnet.solana.com')
  )
  const [account, setAccount] = useState<Account>()
  const [balance, setBalance] = useState<number>(0)

  const initWallet = async () => {
    const tempMnemonic =
      'castle cabin season fatal describe weather update mirror minute club demand sadness'
    const account: Account = await generateAccount(tempMnemonic)
    console.log(account.publicKey.toString())
    setAccount(account)
  }

  useEffect(() => {
    initWallet()
  }, [])

  useEffect(() => {
    if (!account || !connection) return
    console.log('Registering onAccountChange handler')
    connection.onAccountChange(account.publicKey, (change) => {
      console.log('onAccountChange:', change)
      setBalance(change.lamports)
    })

    Object.entries(PLAYERS).forEach((player) => {
      console.log(`${player[0]} onAccountChange handler registered`)
      connection.onAccountChange(player[1].solPublicKey, (change) => {
        console.log(`${player[0]} onAccountChange:`, change)
      })
    })
  }, [account, connection])

  const airdrop = useCallback(async () => {
    const res = await connection.requestAirdrop(
      account.publicKey,
      1 * LAMPORTS_PER_SOL
    )
    console.log(res)
  }, [account, connection])

  const payPlayerDemo = () => {
    actions.payPlayer('alice', 0.5, 'SOL', account, connection)
  }

  return (
    <div className='mt-12' style={{ width: 500 }}>
      <Card
        title={`Your balance`}
        options={
          <Button palette='secondary' onClick={airdrop}>
            Airdrop
          </Button>
        }
      >
        <h6>{balance / LAMPORTS_PER_SOL} SOL</h6>
      </Card>
      <Container>
        <h1 className='my-8'>Pay Player</h1>
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
