import { useEffect } from 'react'
import { useStore } from '@/store'
import { magic } from '@/utilities'

export const useMagicUser = () => {
  const { initMagicUser } = useStore((s) => s.actions)
  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(initMagicUser)
      }
    })
  }, [])
}
