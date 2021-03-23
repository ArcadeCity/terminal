import { useEffect, useState } from 'react'
import { arweave, generateWallet } from '@/utilities'
import { readContract } from 'smartweave'
import Community from 'community-js'
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
    if (!address) return
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
    setBalance(readableBalance)
    setWallet(wallet)
  }

  const generate = async () => {
    const newWallet = await generateWallet()
    saveWallet(newWallet)
    console.log(newWallet)
  }
  function onReaderLoad(event) {
    const wallet = JSON.parse(event.target.result)
    console.log(wallet)
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
          <h5>Your Arweave wallet</h5>
          <p>{address}</p>
          <p className='font-bold'>{balance} AR</p>
          <p className='font-bold'>{arcadeBalance ?? 0} ARCADE</p>
          {/* <button onClick={attach}>Attach</button> */}
        </div>
      ) : (
        <div className='mt-4'>
          <h5>Create Arweave wallet</h5>
          <button onClick={generate}>Create wallet</button>
        </div>
      )}
      <div className='mt-16 w-72'>
        <h5>Upload Arweave wallet</h5>
        <input type='file' onChange={onFileChange} />
      </div>
      {contractState && (
        <div className='mt-16'>
          <h5>{contractState.name} PSC Members</h5>
          <p className='text-lg font-bold'>
            {Object.entries(contractState.balances).length}
          </p>
        </div>
      )}
    </div>
  )
}
