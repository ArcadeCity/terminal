import { useEffect, useState } from 'react'
import { arweave, generateWallet } from '@/utilities'
import { readContract } from 'smartweave'
import Community from 'community-js'

const contractId = '7hVrRtwjs7XLPtpZsQMr6RPz19QjtTqQYpHy3rPEy-4' // ARCADE CITY

export const Arweave = () => {
  const [wallet, setWallet] = useState()
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
  const [contractState, setContractState] = useState()

  const grabContractState = async () => {
    const newContractState = await readContract(arweave, contractId)
    setContractState(newContractState)
  }

  const grabWalletBalance = async () => {
    if (!wallet) {
      console.log("No wallet, can't grab balance...")
      return
    }
    const community = new Community(arweave, wallet)
    try {
      const balance = await community.getBalance()
      console.log('ARCADE Balance:', balance)
    } catch (e) {
      console.log('Balance query error - probably not community member')
      console.log(e)
    }
  }
  useEffect(grabContractState, [])
  useEffect(grabWalletBalance, [wallet])

  const attach = async () => {
    console.log('Attaching wallet')
  }

  const saveWallet = async (wallet) => {
    setWallet(wallet)
    const address1 = await arweave.wallets.jwkToAddress(wallet)
    const balance1 = await arweave.wallets.getBalance(address1)
    const readableBalance = arweave.ar.winstonToAr(balance1)
    setAddress(address1)
    setBalance(readableBalance)
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
    <div className='mt-32 flex flex-col items-center h-screen w-full text-center'>
      {wallet ? (
        <div className='mt-4'>
          <h5>Your Arweave wallet</h5>
          <p>{address}</p>
          <p className='font-bold'>{balance} AR</p>
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
