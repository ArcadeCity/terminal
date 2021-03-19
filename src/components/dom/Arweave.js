import { useState } from 'react'
import { generateWallet } from '@/utilities'

export const Arweave = () => {
  const [wallet, setWallet] = useState()
  const generate = async () => {
    const newWallet = await generateWallet()
    setWallet(newWallet)
    console.log(newWallet)
  }
  function onReaderLoad(event) {
    console.log('event:', event)
    console.log('result:', event.target.result)
    const wallet = JSON.parse(event.target.result)
    console.log(wallet)
    setWallet(wallet)
  }
  const onFileChange = (e) => {
    const file = e.target.files[0]
    var reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(file)
  }

  return (
    <div className='p-32'>
      <h1>Arweave</h1>
      {wallet ? (
        <p>Wallet loaded</p>
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
