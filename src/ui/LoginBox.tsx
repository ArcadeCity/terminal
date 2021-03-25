import Link from 'next/link'

export const LoginBox = () => {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='bg-purple bg-opacity-80 p-12 text-center rounded-lg flex flex-col justify-center items-center'>
        <h1>Terminal Login</h1>
        <Link href='/box'>
          <button>Dummy login</button>
        </Link>
      </div>
    </div>
  )
}
