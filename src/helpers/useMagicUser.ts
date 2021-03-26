import { useEffect } from 'react'
import { useStore } from '@/store'
import { magic } from '@/utilities'

export const useMagicUser = () => {
  const { initUser } = useStore((s) => s.actions)
  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(initUser)
      }
    })
  }, [])
}
