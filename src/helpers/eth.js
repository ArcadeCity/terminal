import { ChainId, Fetcher, Route, Token, WETH } from '@uniswap/sdk'
import { strict as assert } from 'assert'
import { Contract, ethers, utils } from 'ethers'

const NETWORK = 'homestead'
// const NETWORK = 'ropsten'
const YOUR_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
const YOUR_INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
const YOUR_ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

export class Eth {
  constructor() {
    this.provider = ethers.getDefaultProvider(NETWORK, {
      etherscan: YOUR_ETHERSCAN_API_KEY,
      infura: YOUR_INFURA_PROJECT_ID,
      alchemy: YOUR_ALCHEMY_API_KEY,
      quorum: 1,
    })
  }

  async fetchTxStatus(tx) {
    console.log(
      `Fetching status of ${tx} because etherscan doesn't give it to us with the aggregate ERC20 TX data for some reason...`
    )
    const res3 = await fetch(
      `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${tx}&apikey=83WJWNH2Z3YM5CZ8638WDIZMJNJJ14T3BQ`
    )
    const json3 = await res3.json()
    return json3.result.status
  }

  async fetchHistory(address) {
    // Get a list of normal transactions by address - https://etherscan.io/apis#accounts
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=83WJWNH2Z3YM5CZ8638WDIZMJNJJ14T3BQ`
    )
    const json = await res.json()
    const regularHistory = json.result

    await sleep(250)

    // Get a list of "ERC20 - Token Transfer Events" by Address
    const res2 = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=83WJWNH2Z3YM5CZ8638WDIZMJNJJ14T3BQ`
    )
    const json2 = await res2.json()
    let tokenHistory = json2.result

    if (tokenHistory === 'Max rate limit reached') {
      alert(
        'Could not fetch token transactions from Etherscan, try again later'
      )
      tokenHistory = []
    }

    const allHistory = [...regularHistory, ...tokenHistory]
    return allHistory.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
  }

  switchNetwork(networkId) {
    const network = ChainId[networkId].toLowerCase()
    this.provider = ethers.getDefaultProvider(network, {
      etherscan: YOUR_ETHERSCAN_API_KEY,
      infura: YOUR_INFURA_PROJECT_ID,
      alchemy: YOUR_ALCHEMY_API_KEY,
      quorum: 1,
    })
    console.log({
      name: 'eth switchNetwork',
      preview: 'Network is now',
      value: this.provider,
      important: true,
    })
    return this.provider
  }

  async fetchBalances(address) {
    const ethBalance = await this.provider.getBalance(address)
    const ETH = utils.formatEther(ethBalance)

    const arcdBalance = await this.getERC20TokenBalance('ARCD', address)
    const ARCD = parseInt(arcdBalance.toString())

    const ethPrice = await this.provider.getEtherPrice()

    const pair = await this.loadPair('ARCD', 'ETH')
    if (!pair) return null

    const { midPriceInverted: arcdPriceEth } = pair
    const arcdPrice = parseFloat(arcdPriceEth) * ethPrice

    return { ARCD, ETH, ethPrice, arcdPrice }
  }

  async getERC20TokenBalance(symbol, address) {
    assert.ok(symbol)

    const networkId = this.provider.network.chainId

    const arcdToken =
      networkId === 1
        ? '0xb581E3a7dB80fBAA821AB39342E9Cbfd2ce33c23'
        : '0x7Ba509375e2Fae3a0860a2A0b82bD975CB30E6b0'

    // const tokenInfo = getTokenInfo(symbol)
    const tokenInfo = {
      symbol: 'ARCD',
      name: 'Arcade Token',
      type: 'ERC20',
      address: arcdToken,
      decimals: 18,
    }
    if (tokenInfo === undefined) {
      throw new Error(`Can NOT find ERC20 contract address of ${symbol}`)
    }
    // if (detectPlatformFromAddress(address) !== 'ERC20') {
    //     throw new Error(`${address} is NOT a valid ETH address`)
    // }

    const contractAbiFragment = [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        constant: true,
        payable: false,
      },
    ]

    const contract = new Contract(
      tokenInfo.address,
      contractAbiFragment,
      this.provider
    )

    const balance = await contract.balanceOf(address)

    return parseFloat(utils.formatUnits(balance, tokenInfo.decimals))
  }

  async getNetworkStats() {
    const blockNumberPromise = this.provider.getBlockNumber()
    const gasPricePromise = this.provider.getGasPrice()
    const networkPromise = this.provider.getNetwork()

    const [blockNumber, gasPrice, network] = await Promise.all([
      blockNumberPromise,
      gasPricePromise,
      networkPromise,
    ])

    return { blockNumber, gasPrice, network }
  }

  // From app uniswap service
  async loadPair(p1, p2) {
    // console.log(`Loading pair ${p1}/${p2}`)

    let token
    switch (p1) {
      case 'ARCD':
        token = this.initArcd()
        break
      default:
        return
    }

    const pair = await Fetcher.fetchPairData(
      token,
      WETH[token.chainId],
      this.provider
    )

    const route = new Route([pair], WETH[token.chainId])

    return {
      ...pair,
      midPrice: route.midPrice.toSignificant(6),
      midPriceInverted: route.midPrice.invert().toSignificant(6),
    }
  }

  initArcd() {
    const chainId = this.provider.network.chainId

    const arcdToken =
      chainId === 1
        ? '0xb581E3a7dB80fBAA821AB39342E9Cbfd2ce33c23'
        : '0x7Ba509375e2Fae3a0860a2A0b82bD975CB30E6b0'

    const tokenAddress = arcdToken
    const decimals = 18
    const symbol = 'ARCD'
    const name = 'Arcade Token'

    const token = new Token(chainId, tokenAddress, decimals, symbol, name)
    return token
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
