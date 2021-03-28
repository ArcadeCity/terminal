import create from 'zustand'
import { magic } from '@/utilities'
import { Eth } from '@/helpers/eth'

const eth = new Eth()

interface MagicUser {
  email: string
  issuer: string
  publicAddress: string
}

interface LoginEmailProps {
  email: string
}

type State = {
  loggingIn: boolean
  actions: {
    initUser: (magicUser: MagicUser) => void
    loginEmail: (props: LoginEmailProps) => void
  }
  balances: any
  title: string
  magicUser: MagicUser | null
  router: any
  events: any
  setEvents: (events: any) => void
}

export const useStore = create<State>((set, get) => {
  return {
    loggingIn: false,
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
        try {
          const balances = await eth.fetchBalances(magicUser.publicAddress)
          set({ balances })
        } catch (e) {
          console.log(e)
          alert(
            'Error fetching balances. Click your address at the top to view balances on Etherscan.'
          )
        }
      },
      loginEmail: async ({ email }: LoginEmailProps) => {
        set({ loggingIn: true })
        console.log(`Logging in with email ${email}`)
        try {
          await magic.auth.loginWithMagicLink({ email })
          const magicUser = await magic.user.getMetadata()
          get().actions.initUser(magicUser)
        } catch (e) {
          console.log('THAT DID NOT WORK', e)
          // setIsLoggingIn(false)
        }
        set({ loggingIn: false })
      },
    },
  }
})
