import ThreeIdProvider from '3id-did-provider'
import CeramicClient from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { arweave } from './arweave'

const aliases = {
  arweave: 'kjzl6cwe1jw1464kscnkfne9ui7bkv5qt1nzds9dmv09vetjs1qemvh3jzm1vxi',
}

const KEY = aliases.arweave

const getPermission = async (request) => {
  return request.payload.paths
}

async function uploadSecret(ceramic, idx, payload) {
  const jwe = await ceramic.did?.createDagJWE(payload, [ceramic.did.id])
  await idx.set(KEY, jwe)
}

async function downloadSecret(ceramic, idx) {
  const jwe = await idx.get(KEY)
  return jwe ? await ceramic.did?.decryptDagJWE(jwe) : null
}

export const authCeramic = async (magicUser) => {
  console.log('Authing to Ceramic with:', magicUser.issuer)

  const encoder = new TextEncoder() // always utf-8
  const sha = await sha256(magicUser)
  const seed = encoder.encode(sha)

  const API_URL = 'http://localhost:7007'
  const ceramic = new CeramicClient(API_URL)
  const threeParams = { getPermission, seed }
  const threeId = await ThreeIdProvider.create(threeParams)
  const provider = threeId.getDidProvider()
  await ceramic.setDIDProvider(provider)

  const did = ceramic?.did?.id ?? ''
  console.log(`Ceramic DID: ${did}`)
  const idx = new IDX({ ceramic, aliases })

  const existing = await downloadSecret(ceramic, idx)
  if (existing == null) {
    const secret = await generateKey()
    console.log('Uploading Arweave secret:', secret)
    await uploadSecret(ceramic, idx, secret)
    console.log('Uploaded!')
  } else {
    console.log('Found existing secret!')
    // store.setState({ arKey: existing })
    const address1 = await arweave.wallets.jwkToAddress(existing)
    const balance1 = await arweave.wallets.getBalance(address1)
    const arBalance = arweave.ar.winstonToAr(balance1)
    console.log(`Arweave address: ${address1} - AR Balance: ${arBalance}`)
    // store.setState({ arBalance })
    // await getCommunity(existing)
  }
  // const doc = await ceramic.createDocument('tile', {
  //   content: { foo: 'bar' },
  //   metadata: {
  //     controllers: [did],
  //     family: 'doc family',
  //   },
  // })
  // console.log(doc.id.toString())

  // const doc2 = await ceramic.loadDocument(
  //   'kjzl6cwe1jw1491kxqi0eht8298zrsmasciv7lkzycjaqup5nj7t838d9ewstr7'
  // )
  // console.log('Retrieved doc', doc2.content)

  // await doc2.change({ content: { foo: 'UPDATED!' } })
}

export async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => ('00' + b.toString(16)).slice(-2))
    .join('')

  return hashHex
}
