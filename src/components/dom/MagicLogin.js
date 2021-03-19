import { useCallback, useEffect, useState } from 'react'
import { generateWallet, magic } from '@/utilities'

export const MagicLogin = () => {
  const [email, setEmail] = useState()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [userMetadata, setUserMetadata] = useState()

  const init = (metadata) => {
    console.log('Initing with', metadata)
    generateWallet()
  }

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then((metadata) => {
          setUserMetadata(metadata)
          init(metadata)
        })
      }
    })
  }, [])

  const login = useCallback(
    async (e) => {
      e.preventDefault()
      setIsLoggingIn(true)

      try {
        await magic.auth.loginWithMagicLink({ email })
        const metadata = await magic.user.getMetadata()
        setUserMetadata(metadata)
        console.log('Authed with Magic', metadata)
        init(metadata)
      } catch {
        setIsLoggingIn(false)
      }
    },
    [email]
  )

  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      setUserMetadata(null)
      setEmail('')
    })
  }, [])

  return isLoggingIn ? (
    <div style={container}>
      <p className='mb-0'>Logging in...</p>
    </div>
  ) : (
    <div style={container}>
      {userMetadata ? (
        <div className='flex flex-row items-center justify-center space-x-8'>
          <p className='mb-0'>{userMetadata.issuer}</p>
          <h6 className='mb-0'>{userMetadata.email}</h6>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <form onSubmit={login} className='flex flex-row'>
          <input
            type='email'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mr-4'
            placeholder='Enter your email'
          />
          <button type='submit' className='w-48'>
            Log in
          </button>
        </form>
      )}
    </div>
  )
}

const container = {
  position: 'fixed',
  right: 20,
  top: 20,
}
