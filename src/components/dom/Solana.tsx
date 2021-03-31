import { useState, useCallback, useEffect } from 'react'
import { Button, Card } from '@arcadecity/ui'
import { PLAYERS, useStore } from '@/store'
import { Account, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
// import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import * as bip39 from 'bip39'
import nacl from 'tweetnacl'

const generateAccount = async (mnemonic) => {
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32))
  return new Account(keyPair.secretKey)
}

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

    const balance = await connection.getBalance(account.publicKey)
    setBalance(balance)
  }

  useEffect(() => {
    initWallet()
    // console.log('ASSOCIATED_TOKEN_PROGRAM_ID:', ASSOCIATED_TOKEN_PROGRAM_ID)
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
        const balance = change.lamports / LAMPORTS_PER_SOL
        console.log(`${player[0]} SOL balance:`, balance)
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
    actions.payPlayer('alice', 0.35, 'SOL', account, connection)
  }

  return (
    <div className='mt-12' style={{ width: 500 }}>
      <Card
        title={`Your balance`}
        options={
          <>
            <Button palette='secondary' onClick={airdrop}>
              Airdrop
            </Button>
            <Button palette='secondary' onClick={payPlayerDemo}>
              Send
            </Button>
          </>
        }
      >
        <h6>{balance / LAMPORTS_PER_SOL} SOL</h6>
      </Card>
    </div>
  )
}
