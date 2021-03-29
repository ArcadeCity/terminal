import { BigNumber, Contract, ethers, Wallet } from 'ethers'
import {
  ChainId,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from '@uniswap/sdk'
import uniswapAbi from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { magic } from '@/utilities/magic'

const gasPriceGwei = '3' // in GWEI
const gasPriceWei = ethers.utils.parseUnits(gasPriceGwei, 'gwei')

type BaseProvider = ethers.providers.BaseProvider

export class Uniswap {
  ethProvider: BaseProvider
  address: string

  constructor(ethProvider: BaseProvider, address: string) {
    this.ethProvider = ethProvider
    this.address = address
  }

  async tradePair(p1: string, p2: string) {
    // , account: Wallet
    console.log(`Trading ${p1} for ${p2}`)

    // hardcoding for now
    // const mnemonic = ''

    // const wallet = Wallet.fromMnemonic(mnemonic)
    // const account = wallet.connect(this.ethProvider)
    // const account = Wallet.createRandom()

    if (p1 !== 'ETH') {
      console.log('p1 must be ETH for now')
      return false
    }

    let token
    switch (p2) {
      case 'DAI':
        token = this.initDai()
        break
      case 'ARCD':
        token = this.initArcd()
        break
      default:
        return false
    }

    console.log(token)

    const pair = await Fetcher.fetchPairData(
      token,
      WETH[token.chainId],
      this.ethProvider
    )

    const route = new Route([pair], WETH[token.chainId])

    // const amountIn = '1000000000000000000' // 1 WETH
    const amountIn = '25000000000000000' // .025 WETH

    const trade = new Trade(
      route,
      new TokenAmount(WETH[token.chainId], amountIn),
      TradeType.EXACT_INPUT
    )

    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%

    const amountOutMin = BigNumber.from(
      trade.minimumAmountOut(slippageTolerance).raw.toString()
    ) // needs to be converted to e.g. hex
    const path = [WETH[token.chainId].address, token.address]
    const to = this.address // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const valueBefore = trade.inputAmount.raw // // needs to be converted to e.g. hex

    const uniswapRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

    // const abi = {
    //     ...uniswapAbi.abi,
    //     gas: 30000,
    // }

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider)
    const signer = provider.getSigner()

    const contract = new Contract(uniswapRouter, uniswapAbi.abi, signer)

    const nonce = await this.ethProvider.getTransactionCount(this.address)
    console.log('nonce:', nonce)

    const gasLimit = BigNumber.from('220000')

    const maxCostWei = gasPriceWei.mul(gasLimit) // how much gas can we use?

    const bigBal = BigNumber.from(valueBefore.toString()) // ethers.utils.bigNumberify(balance); // balance to big number
    const value = bigBal.sub(maxCostWei) // subtract the fees from the balance to get actual send amount

    // const gasLimit = ethers.utils.bigNumberify('21000');

    const transaction = {
      nonce: nonce,
      gasLimit: ethers.utils.hexlify(gasLimit),
      gasPrice: ethers.utils.hexlify(gasPriceWei),
      to: ethers.utils.hexlify(uniswapRouter), // account we're sending too
      value: ethers.utils.hexlify(value), // total amount to send
    }

    console.log('transaction:', transaction)

    console.log('tradePair trade prep:', {
      bigBal,
      transaction,
      nonce,
      gasLimit,
      trade,
      amountOutMin,
      path,
      to,
      deadline,
      // value,
      contract,
      // UniswapRouterContractAddress,
      // IUniswapV2Router02,
    })

    // const wat = await contract.callStatic()

    const amount = amountOutMin.toHexString()
    const deadline2 = BigNumber.from(deadline).toHexString()

    console.log({
      amount,
      path,
      to,
      deadline2,
    })

    // console.log('ending here')
    // return

    try {
      const tx = await contract.swapExactETHForTokens(
        amount,
        path,
        to,
        deadline2,
        { gasLimit, nonce, value: amountIn }
      )

      console.log(tx)
    } catch (e) {
      console.log('horrible error')
      console.error(e)
      alert(`Error: ${e.message}`)
    }

    // const what = await contract.swapETHForExactTokens(
    //     amountOutMin,
    //     path,
    //     to,
    //     deadline,
    // )

    // contract.address

    // console.tron.display({
    //   name: 'uniswap',
    //   preview: 'tradePair what',
    //   value: gasEstimate,
    // })
    // account.sendTransaction

    return true
  }

  async loadPair(p1: string, p2: string) {
    console.log(`Loading pair ${p1}/${p2}`)

    let token
    switch (p1) {
      case 'DAI':
        token = this.initDai()
        break
      case 'ARCD':
        token = this.initArcd()
        break
      default:
        return
    }

    const pair = await Fetcher.fetchPairData(
      token,
      WETH[token.chainId],
      this.ethProvider
    )

    const route = new Route([pair], WETH[token.chainId])

    return {
      ...pair,
      midPrice: route.midPrice.toSignificant(6),
      midPriceInverted: route.midPrice.invert().toSignificant(6),
    }
  }

  initDai() {
    const chainId = ChainId.MAINNET
    const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed
    const decimals = 18
    const symbol = 'DAI'
    const name = 'Dai Stablecoin'

    const DAI = new Token(chainId, tokenAddress, decimals, symbol, name)
    // console.log('DAI:', DAI)
    return DAI
  }

  initArcd() {
    const chainId = this.ethProvider.network.chainId

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
