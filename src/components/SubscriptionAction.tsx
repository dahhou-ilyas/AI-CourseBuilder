"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { LucideZap } from 'lucide-react'

type Props = {}

const SubscriptionAction = (props: Props) => {
    const {data}=useSession();
    
  return (
    <div className='flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary-foreground/10'>
        {data?.user.credits} / 10  Free Generations
        <Progress className='mt-2' value={data?.user.credits ? (data.user.credits/10)*100:0}/>
        <Button className='mt-3 font-bold text-white transition bg-gradient-to-b from-indigo-700 to-lime-500 hover:from-lime-500 hover:to-indigo-700'>Upgrade <LucideZap className='fill-white ml-2'/></Button>
    </div>
  )
}

export default SubscriptionAction