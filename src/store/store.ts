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

interface User {
  email: string | null
  authType: 'magic' | 'metamask'
}

type State = {
  user: User | null
  arAddress: string | null
  ethAddress: string | null
  uniswapTx: string | null
  loggingIn: boolean
  actions: {
    fetchBalances: () => void
    initMagicUser: (magicUser: MagicUser) => void
    loginEmail: (props: LoginEmailProps) => void
    loginMetamask: () => void
    swapEthForArcd: (props: SwapProps) => Promise<void>
  }
  balances: {
    ARCD: number
    ETH: string
    ethPrice: number
    arcdPrice: number
  } | null
  title: string
  magicUser: MagicUser | null
  router: any
  events: any
  setEvents: (events: any) => void
  uniswap: any
}

export const useStore = create<State>((set, get) => {
  return {
    user: null,
    arAddress: null,
    ethAddress: null,
    uniswapTx: null,
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
        // if (eth > ethBalance) {
        //   alert(`Not enough ETH. Your balance is ${ethBalance}`)
        //   return false
        // }
        const wat = await get().uniswap.tradePair('ETH', 'ARCD', eth)
        return wat
      },
      fetchBalances: async () => {
        const ethAddress = get().ethAddress
        try {
          const balances = await eth.fetchBalances(ethAddress)
          set({ balances })
        } catch (e) {
          console.log(e)
          alert(
            'Error fetching balances. Click your address at the top to view balances on Etherscan.'
          )
        }
      },
      initMagicUser: async (magicUser: MagicUser) => {
        const ethAddress = magicUser.publicAddress
        const uniswap = new Uniswap(eth.provider, ethAddress)
        const user: User = {
          email: magicUser.email,
          authType: 'magic',
        }
        set({ ethAddress, magicUser, uniswap, user })
        setTimeout(() => {
          get().actions.fetchBalances()
        }, 500)
      },
      loginEmail: async ({ email }: LoginEmailProps) => {
        set({ loggingIn: true })
        console.log(`Logging in with email ${email}`)
        try {
          await magic.auth.loginWithMagicLink({ email })
          const magicUser = await magic.user.getMetadata()
          get().actions.initMagicUser(magicUser)
        } catch (e) {
          console.log('THAT DID NOT WORK', e)
          // setIsLoggingIn(false)
        }
        set({ loggingIn: false })
      },
      loginMetamask: async () => {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const ethAddress = accounts[0]
        const user: User = {
          email: '',
          authType: 'metamask',
        }
        const uniswap = new Uniswap(eth.provider, ethAddress)
        set({ ethAddress, uniswap, user })
        console.log(`Authed with Metamask - ${ethAddress}`)
        setTimeout(() => {
          get().actions.fetchBalances()
        }, 500)
      },
    },
  }
})
