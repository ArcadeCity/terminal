import { FormEvent } from 'react'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import styled from 'styled-components'
import { mainSpring } from '@/helpers/springs'
import { Arrow } from '@/helpers/icons'

export const LoginBox = () => {
  const spring = useSpring(mainSpring)
  const loginEmail = (e: FormEvent) => {
    e.preventDefault()
    console.log('Login')
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
        <form onSubmit={loginEmail}>
          <InputContainer>
            <EmailInput placeholder='Email' />
            <InputIconCircle type='submit'>
              <Arrow />
            </InputIconCircle>
          </InputContainer>
        </form>
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
