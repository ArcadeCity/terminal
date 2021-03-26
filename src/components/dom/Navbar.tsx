import { useCallback } from 'react'
import { CSSProperties } from 'styled-components'
import { useStore } from '@/store'
import { magic } from '@/utilities'

export const Navbar = () => {
  const magicUser = useStore((s) => s.magicUser)

  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      useStore.setState({ magicUser: null })
    })
  }, [])

  return (
    <div style={container}>
      <div className='flex flex-row items-center justify-center space-x-8'>
        <p className='mb-0'>{magicUser.publicAddress}</p>
        <h6 className='mb-0'>{magicUser.email}</h6>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  )
}

const container: CSSProperties = {
  position: 'fixed',
  right: 20,
  top: 20,
}
