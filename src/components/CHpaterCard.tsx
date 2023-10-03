"use client"
import { cn } from '@/lib/utils'
import { Chapter } from 'prisma/prisma-client'
import React, { useState } from 'react'

type Props = {
    chapter:Chapter
    chapterIndex:number
}

function CHpaterCard({chapter,chapterIndex}: Props) {
    const [sucess,setSucess]=useState<boolean | null>(true)
  return (
    <div key={chapter.id} className={
        cn("px-4 py-2 mt-2 rounded flex justify-between",{
            'bg-indigo-200 dark:bg-secondary/50':sucess==null,
            "bg-red-400 dark:bg-red-500":sucess==false,
            "bg-teal-400 dark:bg-green-500":sucess==true
        })
    }>
        <h5>Chpater {chapterIndex+1} {chapter.name}</h5>
    </div>
  )
}

export default CHpaterCard