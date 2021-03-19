import { generateWallet } from '@/utilities'

export const Arweave = () => {
  return (
    <div className='p-32'>
      <h1>Arweave</h1>
      <button onClick={generateWallet}>Generate wallet</button>
    </div>
  )
}
