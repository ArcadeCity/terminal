import { useState } from 'react'
import { arweave, generateWallet } from '@/utilities'
import Community from 'community-js'
import { readContract, selectWeightedPstHolder } from 'smartweave'

const contractId = '3dEhZZT5V0h4dPCdDiyUea01snT20c9DXt7yKJCW8aA'

export const Arweave = () => {
  const [wallet, setWallet] = useState()
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
  const [contractState, setContractState] = useState()
  const saveWallet = async (wallet) => {
    setWallet(wallet)
    const address1 = await arweave.wallets.jwkToAddress(wallet)
    const balance1 = await arweave.wallets.getBalance(address1)
    console.log(
      `Arweave address: ${address1} - AR Balance: ${arweave.ar.winstonToAr(
        balance1
      )}`
    )
    setAddress(address1)
    setBalance(balance1)

    const community = new Community(arweave, wallet)
    console.log(community)

    const fees = await community.getFees()
    console.log('Fees:', fees)

    const newContractState = await readContract(arweave, contractId)
    setContractState(newContractState)
    console.log(newContractState)
  }
  const generate = async () => {
    const newWallet = await generateWallet()
    saveWallet(newWallet)
    console.log(newWallet)
  }
  function onReaderLoad(event) {
    console.log('event:', event)
    console.log('result:', event.target.result)
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
    <div className='p-32'>
      {contractState && (
        <>
          <h5>PSC: {contractState.name}</h5>
          <p>Ticker: {contractState.ticker}</p>
          <p>Members: {Object.entries(contractState.balances).length}</p>
        </>
      )}
      {wallet ? (
        <div className='mt-16'>
          <h5>Your Arweave wallet</h5>
          <p>{address}</p>
          <p className='font-bold'>{balance} AR</p>
        </div>
      ) : (
        <button onClick={generate}>Generate wallet</button>
      )}
      <div className='mt-16 w-72'>
        <h5>Upload Arweave wallet</h5>
        <input type='file' onChange={onFileChange} />
      </div>
    </div>
  )
}
