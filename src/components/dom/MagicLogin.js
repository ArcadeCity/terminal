import { useCallback, useEffect, useState } from 'react'
import {
  addEncryptedObject,
  addSignedObject,
  authDid,
  followSecretPath,
  initIpfs,
  magic,
} from '@/utilities'

export const MagicLogin = () => {
  const [email, setEmail] = useState()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [userMetadata, setUserMetadata] = useState()

  const initUser = async (metadata) => {
    if (!process.browser) return false
    setUserMetadata(metadata)
    setIsLoggingIn(false)
    // await connectIPFS()
  }

  const connectIPFS = async () => {
    const did = await authDid()
    const ipfs = await initIpfs()

    // Create our first signed object
    const cid1 = await addSignedObject(did, ipfs, { hello: 'world' })

    // Log the DagJWS:
    console.log((await ipfs.dag.get(cid1)).value)
    // > {
    // >   payload: "AXESIHhRlyKdyLsRUpRdpY4jSPfiee7e0GzCynNtDoeYWLUB",
    // >   signatures: [{
    // >     signature: "h7bHmTaBGza_QlFRI9LBfgB3Nw0m7hLzwMm4nLvcR3n9sHKRoCrY0soWnDbmuG7jfVgx4rYkjJohDuMNgbTpEQ",
    // >     protected: "eyJraWQiOiJkaWQ6MzpiYWdjcWNlcmFza3hxeng0N2l2b2tqcW9md295dXliMjN0aWFlcGRyYXpxNXJsem4yaHg3a215YWN6d29hP3ZlcnNpb24taWQ9MCNrV01YTU1xazVXc290UW0iLCJhbGciOiJFUzI1NksifQ"
    // >   }],
    // >   link: CID(bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae)
    // > }

    // Log the payload:
    ipfs.dag.get(cid1, { path: '/link' }).then((b) => console.log(b.value))
    // > { hello: 'world' }

    // Create another signed object that links to the previous one
    const cid2 = await addSignedObject(did, ipfs, {
      hello: 'getting the hang of this',
      prev: cid1,
    })

    // Log the new payload:
    ipfs.dag.get(cid2, { path: '/link' }).then((b) => console.log(b.value))
    // > {
    // >   hello: 'getting the hang of this'
    // >   prev: CID(bagcqcerappi42sb4uyrjkhhakqvkiaibkl4pfnwpyt53xkmsbkns4y33ljzq)
    // > }

    // Log the old payload:
    ipfs.dag
      .get(cid2, { path: '/link/prev/link' })
      .then((b) => console.log(b.value))
    // > { hello: 'world' }

    const jws1 = await ipfs.dag.get(cid1)
    console.log('jws1:', jws1)
    const jws2 = await ipfs.dag.get(cid2)
    console.log('jws2:', jws2)

    const signingDID1 = await did.verifyJWS(jws1.value)
    console.log('signingDID1:', signingDID1)
    const signingDID2 = await did.verifyJWS(jws2.value)
    console.log('signingDID2:', signingDID2)

    const cid3 = await addEncryptedObject(did, ipfs, { hello: 'secret' }, [
      did.id,
    ])

    console.log('cid3:', cid3)

    const cid4 = await addEncryptedObject(
      did,
      ipfs,
      { hello: 'cool!', prev: cid3 },
      [did.id]
    )

    console.log('cid4:', cid4)

    await followSecretPath(did, ipfs, cid3)
    // > { hello: 'secret' }

    // Retrive multiple linked objects
    await followSecretPath(did, ipfs, cid4)
  }

  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(initUser)
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
        initUser(metadata)
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
