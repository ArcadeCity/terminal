import create from 'zustand'
import { magic } from '@/utilities'
import { Eth } from '@/helpers/eth'

const eth = new Eth()

type MagicUser = {
  email: string
  issuer: string
  publicAddress: string
}

type LoginEmailProps = {
  email: string
}

type State = {
  actions: {
    initUser: (magicUser: MagicUser) => void
    loginEmail: (props: LoginEmailProps) => void
  }
  balances: any
  title: string
  magicUser: MagicUser | any
  router: any
  events: any
  setEvents: (events: any) => void
}

export const useStore = create<State>((set, get) => {
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
      initUser: async (magicUser: MagicUser) => {
        set({ magicUser })
        const balances = await eth.fetchBalances(magicUser.publicAddress)
        set({ balances })
      },
      loginEmail: async ({ email }: LoginEmailProps) => {
        console.log(`Logging in with email ${email}`)
        try {
          await magic.auth.loginWithMagicLink({ email })
          const magicUser = await magic.user.getMetadata()
          get().actions.initUser(magicUser)
        } catch (e) {
          console.log('THAT DID NOT WORK', e)
          // setIsLoggingIn(false)
        }
      },
    },
  }
})
