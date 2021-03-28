import { useEffect, useState } from 'react'
import { Button, Card, Text } from '@arcadecity/ui'
import { arweave, generateWallet } from '@/utilities'
import { readContract } from 'smartweave'
import Community from 'community-js'
import { useStore } from '@/store'
import { BalancesInterface, VaultInterface } from 'community-js/lib/faces'

const contractId = '7hVrRtwjs7XLPtpZsQMr6RPz19QjtTqQYpHy3rPEy-4' // ARCADE CITY

export const Arweave = () => {
  const [wallet, setWallet] = useState()
  const [address, setAddress] = useState<string>()
  const [balance, setBalance] = useState<string>()
  const [arcadeBalance, setArcadeBalance] = useState<number>()
  const [contractState, setContractState] = useState<any>()

  const grabContractState = async () => {
    const newContractState = await readContract(arweave, contractId)
    setContractState(newContractState)
    getAddressBalance()
  }

  const getAddressBalance = () => {
    if (!address || !contractState) return
    const balances: BalancesInterface = contractState.balances
    const vault: VaultInterface = contractState.vault
    const unlocked = balances[address]

    let locked = 0
    const userVault = vault[address]
    if (userVault) {
      for (let i = 0, j = userVault.length; i < j; i++) {
        locked += userVault[i].balance
      }
    }

    const balance = unlocked ? unlocked + locked : 0
    setArcadeBalance(balance)
    return { balance: unlocked + locked, unlocked, vault: locked }
  }

  useEffect(() => {
    grabContractState()
  }, [wallet])

  const saveWallet = async (wallet) => {
    const address1 = await arweave.wallets.jwkToAddress(wallet)
    const balance1 = await arweave.wallets.getBalance(address1)
    const readableBalance = arweave.ar.winstonToAr(balance1)
    setAddress(address1)
    useStore.setState({ arAddress: address1 })
    setBalance(readableBalance)
    setWallet(wallet)
  }

  const generate = async () => {
    const newWallet = await generateWallet()
    saveWallet(newWallet)
  }
  function onReaderLoad(event) {
    const wallet = JSON.parse(event.target.result)
    saveWallet(wallet)
  }
  const onFileChange = (e) => {
    const file = e.target.files[0]
    var reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(file)
  }

  return (
    <div className='mt-8 flex flex-col items-center w-full text-center'>
      {wallet ? (
        <div className='mt-4'>
          <Card title='Your Arweave wallet'>
            <p>{address}</p>
            <p className='font-bold'>{balance} AR</p>
            <p className='mb-0 font-bold'>{arcadeBalance ?? 0} ARCADE</p>
          </Card>
        </div>
      ) : (
        <div className='mt-4'>
          <Card title='Create Arweave wallet'>
            <Button onClick={generate}>Create wallet</Button>
          </Card>
        </div>
      )}
      <div className='mt-12 w-72'>
        <Card title='Upload Arweave wallet'>
          <input
            type='file'
            onChange={onFileChange}
            className='w-64 cursor-pointer absolute'
          />
          <div className='mt-12' />
        </Card>
      </div>
      {contractState && (
        <div className='mt-12'>
          <Card title={`${contractState.name} PSC Members`}>
            <p className='text-lg font-bold'>
              {Object.entries(contractState.balances).length}
            </p>
            <Text>Profit-sharing community.</Text>
          </Card>
        </div>
      )}
    </div>
  )
}
