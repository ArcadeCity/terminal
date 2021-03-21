import { useCallback, useEffect, useState } from 'react'
import { DID } from 'dids'
import ThreeIdProvider from '3id-did-provider'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import KeyResolver from '@ceramicnetwork/key-did-resolver'
import { initIpfs, magic } from '@/utilities'
import Web3Utils from 'web3-utils'
import { randomBytes } from '@stablelib/random'

const getPermission = async (request) => {
  console.log('Granting permission')
  return request.payload.paths
}

export const MagicLogin = () => {
  const [email, setEmail] = useState()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [userMetadata, setUserMetadata] = useState()

  const getArWallet = async (metadata) => {
    const bytes = Web3Utils.hexToBytes(metadata.publicAddress)
    const seed = bytes.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    console.log(seed)
  }

  const connectIPFS4 = async (metadata) => {
    const seed = randomBytes(32) // 32 bytes of entropy, Uint8Array
    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver: KeyResolver.getResolver() })
    await did.authenticate({ provider, paths: [] })
    // const ipfs = await initIpfs()
    // console.log('ipfs:', ipfs)
    const payload = { hello: 'world' }
    const { jws, linkedBlock } = await did.createDagJWS(payload)
    console.log(jws, linkedBlock)
    // const jwe = await did.createDagJWE(, [did])
    // console.log(jwe)

    // const seed = randomBytes(32) // 32 bytes of entropy, Uint8Array
    // const threeParams = { getPermission, seed }
    // const threeId = await ThreeIdProvider.create(threeParams)
    // const provider = threeId.getDidProvider()
    // console.log(provider)
  }

  const connectIPFS3 = async (metadata) => {
    const seed = randomBytes(32) // 32 bytes of entropy, Uint8Array
    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver: KeyResolver.getResolver() })

    async function addEncryptedObject(cleartext, dids) {
      const jwe = await did.createDagJWE(cleartext, dids)
      return ipfs.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' })
    }

    // Authenticate with the provider
    await did.authenticate()

    // Read the DID string - this will throw an error if the DID instance is not authenticated
    const aliceDID = did.id

    // Create a JWS - this will throw an error if the DID instance is not authenticated
    const jws = await did.createJWS({ hello: 'world' })
  }

  const connectIPFS2 = async (metadata) => {
    if (!process.browser) return false
    console.log(metadata)

    const bytes = Web3Utils.hexToBytes(metadata.publicAddress)
    const seed = bytes.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    console.log(seed)

    // // See https://github.com/decentralized-identity/did-resolver
    // const did1 = new DID({ resolver: KeyResolver.getResolver() })

    // // Resolve a DID document
    // const wat = await did1.resolve(
    //   'did:ethr:0x10C42246259e067852Ae38d248E11481abb7f3f8'
    // )
    // console.log(wat)

    // const ipfs = await initIpfs()
    // console.log('ipfs:', ipfs)

    // const Web3 = (await import('web3')).default
    // const bytes = Web3Utils.fromAscii(metadata.issuer)

    // const bytes = Web3Utils.hexToBytes(metadata.publicAddress)

    // console.log(bytes)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // bytes.push(0)
    // console.log(bytes)

    // const encoder = new TextEncoder() // always utf-8
    // const sha = await sha256(metadata.publicAddress)
    // const seed = encoder.encode(bytes)

    // const seed = metadata.publicAddress
    // const seed = randomBytes(32)
    // console.log(seed)

    // create did instance
    const provider = new Ed25519Provider(seed)
    console.log(provider)
    const did = new DID({ provider, resolver: KeyResolver.getResolver() })
    console.log(did)
    await did.authenticate()
    window.did = did
    console.log('Connected with DID:', did.id)

    // const threeParams = { getPermission, seed }
    // const threeId = await ThreeIdProvider.create(threeParams)
    // const provider = threeId.getDidProvider()
    // const did = new DID({ provider, resolver: KeyResolver.getResolver() }) //
    // console.log('Authenticating did...')
    // await did.authenticate()
    // console.log('Authenticated')

    // const payload = { hello: 'world' }

    // const { jws, linkedBlock } = await did.createDagJWS(payload)
    // // put the JWS into the ipfs dag
    // const jwsCid = await ipfs.dag.put(jws, {
    //   format: 'dag-jose',
    //   hashAlg: 'sha2-256',
    // })
    // // put the payload into the ipfs dag
    // await ipfs.block.put(linkedBlock, { cid: jws.link })
    // console.log('DONE?', jwsCid)
    // return jwsCid
  }

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then((metadata) => {
          setUserMetadata(metadata)
          // getArWallet(metadata)
          connectIPFS2(metadata)
        })
      }
    })
  }, [])

  const login = useCallback(
    async (e) => {
      e.preventDefault()
      setIsLoggingIn(true)

      try {
        await magic.auth.loginWithMagicLink({ email })
        const metadata = await magic.user.getMetadata()
        setUserMetadata(metadata)
        console.log('Authed with Magic', metadata)
        getArWallet(metadata)
      } catch {
        setIsLoggingIn(false)
      }
    },
    [email]
  )

  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      setUserMetadata(null)
      setEmail('')
    })
  }, [])

  return isLoggingIn ? (
    <div style={container}>
      <p className='mb-0'>Logging in...</p>
    </div>
  ) : (
    <div style={container}>
      {userMetadata ? (
        <div className='flex flex-row items-center justify-center space-x-8'>
          <p className='mb-0'>{userMetadata.issuer}</p>
          <h6 className='mb-0'>{userMetadata.email}</h6>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <form onSubmit={login} className='flex flex-row'>
          <input
            type='email'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mr-4'
            placeholder='Enter your email'
          />
          <button type='submit' className='w-48'>
            Log in
          </button>
        </form>
      )}
    </div>
  )
}

const container = {
  position: 'fixed',
  right: 20,
  top: 20,
}

async function sha256(message) {
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
