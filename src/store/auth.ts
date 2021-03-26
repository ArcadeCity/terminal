import { magic } from '@/utilities'

type MagicUser = {
  email: string
  issuer: string
  publicAddress: string
}

type LoginEmailProps = {
  email: string
}

export const auth = (set, get) => ({
  loginEmail: async ({ email }: LoginEmailProps) => {
    console.log(`Logging in with email ${email}`)
    try {
      await magic.auth.loginWithMagicLink({ email })
      const magicUser = await magic.user.getMetadata()
      set({ magicUser })
      // initUser(metadata)
    } catch (e) {
      console.log('THAT DID NOT WORK', e)
      // setIsLoggingIn(false)
    }
  },
})
