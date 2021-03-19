import { Magic } from 'magic-sdk'

process.browser && console.log(process.env.NODE_ENV)

export const magic =
  process.browser && new Magic(process.env.NEXT_PUBLIC_MAGIC_TEST_PK)
