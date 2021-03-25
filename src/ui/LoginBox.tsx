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
    // loop: { reverse: true },
  })
  return (
    <a.div
      className='h-screen w-screen flex flex-col justify-center items-center'
      style={{
        opacity: spring.x,
        // color: spring.x.to([0, 1], ['#7fffd4', '#c70f46']),
      }}
    >
      <div className='bg-purple bg-opacity-80 p-12 text-center rounded-lg flex flex-col justify-center items-center'>
        <h1>Terminal Login</h1>
        <Link href='/box'>
          <button>Dummy login</button>
        </Link>
      </div>
    </a.div>
  )
}
