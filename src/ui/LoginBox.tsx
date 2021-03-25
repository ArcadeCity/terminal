import Link from 'next/link'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import styled from 'styled-components'

export const LoginBox = () => {
  const spring = useSpring({
    from: { x: 0 },
    to: { x: 1 },
    config: {
      mass: 5,
      tension: 1000,
      friction: 50,
      precision: 0.0001,
      clamp: true,
      duration: 1500,
    },
  })
  const loginEmail = (e) => {
    e.preventDefault()
    console.log('Login')
  }
  return (
    <a.div
      className='h-screen w-screen flex flex-col justify-center items-center'
      style={{
        // @ts-ignore
        opacity: spring.x,
      }}
    >
      <div className='text-center rounded-lg flex flex-col justify-center items-center'>
        <form onSubmit={loginEmail}>
          <InputContainer>
            <EmailInput placeholder='Email' />
            <InputIconCircle type='submit'>
              <svg
                width='17'
                height='16'
                viewBox='0 0 17 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z'
                  fill='white'
                ></path>
              </svg>
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
