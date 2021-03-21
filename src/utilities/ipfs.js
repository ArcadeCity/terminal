import IPFS from 'ipfs'
import dagJose from 'dag-jose'
import { authDid } from '@/utilities'

export const initIpfs = async () => {
  if (!process.browser) return false
  const { sha256 } = await import('multiformats/hashes/sha2')
  const legacy = (await import('multiformats/legacy')).default
  const hasher = {}
  hasher[sha256.code] = sha256
  const dagJoseFormat = legacy(dagJose, { hashes: hasher })
  const ipfs = await IPFS.create({ ipld: { formats: [dagJoseFormat] } })
  return ipfs
}

export const addSignedObject = async (did, ipfs, payload) => {
  // sign the payload as dag-jose
  const { jws, linkedBlock } = await did.createDagJWS(payload)
  // put the JWS into the ipfs dag
  const jwsCid = await ipfs.dag.put(jws, {
    format: 'dag-jose',
    hashAlg: 'sha2-256',
  })
  // put the payload into the ipfs dag
  await ipfs.block.put(linkedBlock, { cid: jws.link })
  return jwsCid
}

export const addEncryptedObject = async (did, ipfs, cleartext, dids) => {
  const jwe = await did.createDagJWE(cleartext, dids)
  return ipfs.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' })
}

export const followSecretPath = async (did, ipfs, cid) => {
  const jwe = (await ipfs.dag.get(cid)).value
  const cleartext = await did.decryptDagJWE(jwe)
  console.log('Decrypted:', cleartext)
  if (cleartext.prev) {
    followSecretPath(did, ipfs, cleartext.prev)
  }
}

export const connectIPFS = async () => {
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
