"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

const SubscriptionAction = (props: Props) => {
    const {data}=useSession();
    
  return (
    <div className='flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary-foreground/60'>
        {data?.user.credits} / 10  Free Generations
    </div>
  )
}

export default SubscriptionAction