import create from 'zustand'
import { magic } from '@/utilities'

type MagicUser = {
  email: string
  issuer: string
  publicAddress: string
}

type State = {
  balances: any
  title: string
  magicUser: MagicUser | any
  router: any
  events: any
  setEvents: (events: any) => void
  actions: {
    loginEmail: (e: FormEvent) => void
  }
}

const useStore = create<State>((set) => {
  return {
    balances: null,
    title: '',
    magicUser: null,
    router: {},
    events: null,
    setEvents: (events) => {
      set({ events })
    },
    actions: {
      loginEmail: async ({ email }: { email: string }) => {
        console.log(`Logging in with email ${email}`)
        try {
          await magic.auth.loginWithMagicLink({ email })
          const metadata = await magic.user.getMetadata()
          console.log(metadata)
          // initUser(metadata)
        } catch (e) {
          console.log('THAT DID NOT WORK', e)
          // setIsLoggingIn(false)
        }
      },
    },
  }
})

export default useStore
