"use client"
import { InfoIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function Info({}: Props) {
    const [over,setOver]=useState<boolean>(false)

    function ovr(){
        setOver(true)
    }
    function out(){
        setOver(false)
    }
  return (
    <div onMouseOver={ovr} onMouseOut={out} className={over? 'flex p-4 mt-5 border-none bg-white/10 rounded-lg':"flex p-3 mt-5 border-none bg-white/10 rounded-lg m-auto"}>
        <InfoIcon className='w-12 h12 mr-3 text-neutral-800 dark:text-gray-200 '/>
        <p hidden={!over}>Tell us what course you're interested in or what you want to learn. Next, pick the specific topics or units you'd like to delve into. The AI will then put together a personalized course just for you</p>
    </div>
  )
}

export default Info