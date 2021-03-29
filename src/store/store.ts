import create from 'zustand'
import { magic } from '@/utilities'
import { Eth } from '@/helpers/eth'
import { Uniswap } from '@/helpers/uniswap'

const eth = new Eth()
const uniswap = new Uniswap(eth.provider)

interface MagicUser {
  email: string
  issuer: string
  publicAddress: string
}

interface LoginEmailProps {
  email: string
}

interface SwapProps {
  eth: number
}

type State = {
  loggingIn: boolean
  actions: {
    initUser: (magicUser: MagicUser) => void
    loginEmail: (props: LoginEmailProps) => void
    swapEthForArcd: (props: SwapProps) => void
  }
  balances: {
    ARCD: number
    ETH: string
    ethPrice: number
    arcdPrice: number
  } | null
  title: string
  magicUser: MagicUser | null
  arAddress: string | null
  router: any
  events: any
  setEvents: (events: any) => void
}

export const useStore = create<State>((set, get) => {
  return {
    arAddress: null,
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
      swapEthForArcd: async ({ eth }) => {
        console.log(`Swapping ${eth} ETH for ARCD`)
        const balances = get().balances
        const ethBalance = parseFloat(balances.ETH)
        if (eth > ethBalance) {
          alert(`Not enough ETH. Your balance is ${ethBalance}`)
          return false
        }
      },
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
