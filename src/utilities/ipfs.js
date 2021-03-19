import IPFS from 'ipfs'
import dagJose from 'dag-jose'

export const initIpfs = async () => {
  const { sha256 } = await import('multiformats/hashes/sha2')
  const legacy = (await import('multiformats/legacy')).default
  const hasher = {}
  hasher[sha256.code] = sha256
  const dagJoseFormat = legacy(dagJose, { hashes: hasher })
  const ipfs = await IPFS.create({ ipld: { formats: [dagJoseFormat] } })
  return ipfs
}
