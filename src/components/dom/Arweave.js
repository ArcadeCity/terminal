import { useState } from 'react'
import { arweave, generateWallet } from '@/utilities'

export const Arweave = () => {
  const [wallet, setWallet] = useState()
  const [address, setAddress] = useState()
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
      <h1 className='mb-12'>Arweave</h1>
      {wallet ? (
        <>
          <h6>Wallet loaded</h6>
          <p>{address}</p>
        </>
      ) : (
        <button onClick={generate}>Generate wallet</button>
      )}
      <div className='mt-12 w-72'>
        <h6>Upload wallet</h6>
        <input type='file' onChange={onFileChange} />
      </div>
    </div>
  )
}
