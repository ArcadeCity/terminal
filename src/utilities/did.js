import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import KeyResolver from '@ceramicnetwork/key-did-resolver'
import { magic } from '@/utilities'
import Web3Utils from 'web3-utils'
import { ethers } from 'ethers'

export const authDid = async () => {
  const magicProvider = new ethers.providers.Web3Provider(magic.rpcProvider)
  const signer = magicProvider.getSigner()
  const originalMessage = 'Arcade City Terminal Authentication Signature'
  const signedMessage = await signer.signMessage(originalMessage)
  const bytes = Web3Utils.hexToBytes(signedMessage)
  const seed = bytes.slice(0, 32)
  const provider = new Ed25519Provider(seed)
  const did = new DID({ provider, resolver: KeyResolver.getResolver() })
  await did.authenticate()
  console.log('Authenticated with DID:', did.id)
  return did
}
