import { useEffect, useState } from 'react'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import styled from 'styled-components'
import { Button } from '@arcadecity/ui'
import { mainSpring } from '@/helpers/springs'
import { Arrow } from '@/helpers/icons'
import { useForm } from 'react-hook-form'

declare global {
  interface Window {
    ethereum: any
  }
}

export const LoginBox = ({ useStore }) => {
  const [showMetamaskButton, setMetamask] = useState<boolean>(false)
  const { handleSubmit, register } = useForm()
  const spring = useSpring(mainSpring)
  const { loginEmail } = useStore((s: ExpectedStore) => s.actions)
  const loggingIn = useStore((s: ExpectedStore) => s.loggingIn)
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      setMetamask(true)
    }
  }, [])

  const loginMetamask = async () => {
    console.log('logging in w metamask')
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = accounts[0]
    console.log(account)
  }

  return (
    <a.div
      // @ts-ignore
      style={{ opacity: spring.x }}
      className='h-screen w-screen flex flex-col justify-center items-center'
    >
      <div className='text-center rounded-lg flex flex-col justify-center items-center'>
        <LogoText>Terminal</LogoText>
        <Text>Your gateway to Arcade City</Text>
        <form
          onSubmit={handleSubmit(loginEmail)}
          className={loggingIn ? 'opacity-0' : ''}
        >
          <InputContainer>
            <EmailInput ref={register} name='email' placeholder='Email' />
            <InputIconCircle type='submit'>
              <Arrow />
            </InputIconCircle>
          </InputContainer>
        </form>
        {showMetamaskButton && (
          <button className='mt-6 text-gray-500' onClick={loginMetamask}>
            Log in with Metamask
          </button>
        )}
      </div>
    </a.div>
  )
}

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
`

const EmailInput = styled.input`
  font-size: 20px;
  line-height: 24px;
  color: white;
  letter-spacing: 1px;
  border-radius: 100px;
  padding: 14px 60px 14px 25px;
  background: rgb(24, 24, 24);
  border: 1px solid transparent;
  width: 100%;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 4px inset;
  outline: none;
`

const InputIconCircle = styled.button`
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px #3efbfb;
  }
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(#05c6c1 0%, #15333c 100%);
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: absolute;
  top: 7px;
  right: 7px;
`

const LogoText = styled.h1`
  font-size: 54px;
  line-height: normal;
  color: white;
  font-weight: 700;
`

const Text = styled.p`
  margin-bottom: 30px;
  margin-top: 6px;
  font-size: 20px;
  line-height: normal;
  color: rgb(153, 153, 153);
  font-weight: 400;
  text-align: center;
`

interface MagicUser {
  email: string
  issuer: string
  publicAddress: string
}

interface ExpectedStore {
  loggingIn: boolean
  magicUser: MagicUser | null
  balances: {
    ARCD: string
    ETH: string
    ethPrice: string
    arcdPrice: string
  }
  actions: {
    loginEmail: ({ email }: { email: string }) => void
  }
}
