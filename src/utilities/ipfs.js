import IPFS from 'ipfs'
import dagJose from 'dag-jose'

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
