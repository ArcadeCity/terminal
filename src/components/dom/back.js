import Link from 'next/link'

const BackButton = () => {
  return (
    <Link href='/' as={`/`}>
      <button className='absolute z-20 py-1 px-6 m-2 focus:outline-none focus:ring'>
        Previous page
      </button>
    </Link>
  )
}

export default BackButton
