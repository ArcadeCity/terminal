import { useEffect } from 'react'
import { useStore } from '@/store'
import { magic } from '@/utilities'

export const useMagicUser = () => {
  const { initUser } = useStore((s) => s.actions)
  console.log('so lets see w', initUser)
  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      console.log('magicIsLoggedIn:', magicIsLoggedIn)
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(initUser)
      } else {
        console.log('setConfirmedNoUser(true)')
        // setConfirmedNoUser(true)
      }
    })
  }, [])
}
