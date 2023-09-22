import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='fixed inset-x-1 top-0 bg-indigo-300 dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2'>
        <div className='flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl'>
            <p className='rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white'>
                COURS AI
            </p>
        </div>
    </nav>
  )
}

export default Navbar