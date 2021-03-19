import { Magic } from 'magic-sdk'

export const magic =
  process.browser && new Magic(process.env.NEXT_PUBLIC_MAGIC_TEST_PK)
