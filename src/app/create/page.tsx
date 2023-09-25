import { getAuthSession } from '@/lib/auth'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'

import {InfoIcon} from 'lucide-react'
import Info from './compona'
import CreateCoursForm from '@/components/CreateCoursForm'


type Props = {}

async function CreatePgae({}: Props) {
  
    const session=await getAuthSession()
    if(!session?.user){
        return redirect('/gallery')
    }
  return (
    <div className='flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0'>
        <h1 className='font-serif self-center text-3xl text-center sm:text-5xl'>Generate Cours</h1>
        <Info/>
        <CreateCoursForm/>
    </div>
  )
}

export default CreatePgae