import { getAuthSession } from '@/lib/auth'
import React from 'react'
import { redirect } from 'next/navigation'

import {InfoIcon} from 'lucide-react'


type Props = {}

async function CreatePgae({}: Props) {
    const session=await getAuthSession()
    if(!session?.user){
        return redirect('/gallery')
    }
  return (
    <div className='flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0'>
        <h1 className='font-serif self-center text-3xl text-center sm:text-5xl'>Generate Cours</h1>
        <div className='flex p-4 mt-5 border-none bg-white/10 rounded-lg'>
            <InfoIcon className='w-12 h12 mr-3 text-neutral-800 dark:text-gray-200 '/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ipsam esse soluta at consequatur labore aliquid et iste, molestiae sint sapiente a excepturi incidunt delectus odit cupiditate. Numquam, error autem.</p>
        </div>
    </div>
  )
}

export default CreatePgae