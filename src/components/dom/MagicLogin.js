import { useCallback, useEffect, useState } from 'react'
import { connectIPFS, magic } from '@/utilities'
import useStore from '@/helpers/store'

export const MagicLogin = () => {
  const [email, setEmail] = useState()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [userMetadata, setUserMetadata] = useState()
  const [confirmedNoUser, setConfirmedNoUser] = useState(false)

  const initUser = async (metadata) => {
    if (!process.browser) return false
    setUserMetadata(metadata)
    useStore.setState({ magicUser: metadata })
    setIsLoggingIn(false)
    // await connectIPFS()
  }

  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(initUser)
      } else {
        setConfirmedNoUser(true)
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
        initUser(metadata)
      } catch {
        setIsLoggingIn(false)
      }
    },
    [email]
  )

  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      setUserMetadata(null)
      // useStore.setState({ magicUser: null })
      setEmail('')
    })
  }, [])

  if (!confirmedNoUser) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen'>
        <p className='mb-0'>Loading</p>
      </div>
    )
  }

  return isLoggingIn ? (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      <p className='mb-0'>Logging in...</p>
    </div>
  ) : (
    <div>
      {userMetadata ? (
        <div style={container}>
          <div className='flex flex-row items-center justify-center space-x-8'>
            <p className='mb-0'>{userMetadata.publicAddress}</p>
            <h6 className='mb-0'>{userMetadata.email}</h6>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
          <div className='max-w-xl text-center'>
            <h1 className='mb-2'>Terminal</h1>
            <form onSubmit={login} className='mt-8 flex flex-row'>
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
          </div>
        </div>
      )}
    </div>
  )
}

const container = {
  position: 'fixed',
  right: 20,
  top: 20,
}
