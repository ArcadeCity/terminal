import { generateWallet } from '@/utilities'

export const Arweave = () => {
  const generate = async () => {
    const wallet = await generateWallet()
    console.log(wallet)
  }
  return (
    <div className='p-32'>
      <h1>Arweave</h1>
      <button onClick={generate}>Generate wallet</button>
    </div>
  )
}
