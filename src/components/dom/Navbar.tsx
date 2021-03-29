import { useCallback } from 'react'
import { Button } from '@arcadecity/ui'
import { useStore } from '@/store'
import { magic } from '@/utilities'

export const Navbar = () => {
  const magicUser = useStore((s) => s.magicUser)
  const user = useStore((s) => s.user)
  const ethAddress = useStore((s) => s.ethAddress)

  const logout = useCallback(() => {
    if (user.authType === 'magic') {
      magic.user.logout().then(() => {
        useStore.setState({ magicUser: null, user: null })
      })
    } else {
      useStore.setState({ magicUser: null, user: null })
    }
  }, [])

  if (!user || !ethAddress) return <></>

  return (
    <div className='mt-4 flex flex-row items-center justify-center space-x-8'>
      <a href={`https://etherscan.io/address/${ethAddress}`} target='_blank'>
        <p className='mb-0'>{ethAddress}</p>
      </a>
      <h6 className='mb-0'>{user.email}</h6>
      <Button onClick={logout}>Log out</Button>
    </div>
  )
}
