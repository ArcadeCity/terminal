import { useState } from 'react'
import { arweave, generateWallet } from '@/utilities'

export const Arweave = () => {
  const [wallet, setWallet] = useState()
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
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
      {wallet ? (
        <>
          <h5>Your Arweave wallet</h5>
          <p>{address}</p>
          <p className='font-bold'>{balance} AR</p>
        </>
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
