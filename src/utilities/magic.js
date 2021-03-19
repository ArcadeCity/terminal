import { Magic } from 'magic-sdk'

const magicKey =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_MAGIC_LIVE_PK
    : process.env.NEXT_PUBLIC_MAGIC_TEST_PK

export const magic = process.browser && new Magic(magicKey)
