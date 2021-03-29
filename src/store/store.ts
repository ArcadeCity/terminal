import create from 'zustand'
import { magic } from '@/utilities'
import { Eth } from '@/helpers/eth'
import { Uniswap } from '@/helpers/uniswap'

const eth = new Eth()

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
  uniswapTx: string | null
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
  uniswap: any
}

export const useStore = create<State>((set, get) => {
  return {
    uniswapTx: null,
    arAddress: null,
    loggingIn: false,
    balances: null,
    title: '',
    magicUser: null,
    router: {},
    uniswap: null,
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
        const wat = await get().uniswap.tradePair('ETH', 'ARCD')
        console.log('wat:', wat)
      },
      initUser: async (magicUser: MagicUser) => {
        const uniswap = new Uniswap(eth.provider, magicUser.publicAddress)
        set({ magicUser, uniswap })
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
