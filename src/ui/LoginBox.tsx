import Link from 'next/link'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'

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
    },
  })
  return (
    <a.div
      className='h-screen w-screen flex flex-col justify-center items-center'
      style={{
        // @ts-ignore
        opacity: spring.x,
      }}
    >
      <div className='bg-purple p-12 text-center rounded-lg flex flex-col justify-center items-center'>
        <button>Dummy login</button>
      </div>
    </a.div>
  )
}
