"use client"
import { Chapter, Course, Unit } from 'prisma/prisma-client'
import React, { useRef } from 'react'
import CHpaterCard, { ChapterCardHandler } from './CHpaterCard'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import {ChevronLeftCircleIcon, ChevronRightCircle } from 'lucide-react'

type Props = {
    course:Course & {
        units:(Unit & {
            chapters:Chapter[]
        })[]
    }

}

function ConfirmeChapter({course}: Props) {
    const chapterRef:Record<string,React.RefObject<ChapterCardHandler>>={}
    course.units.forEach(unit=>{
        unit.chapters.forEach(chapter=>{
            chapterRef[chapter.id]=useRef(null)
        })
    })
    const [completeChapter,setCompleteChapter]=React.useState<Set<string>>(new Set())

    //cette function permet de calculer le nombre totale des chaptire dans un coure
    //en utilisant useMemo pour eviter de chaque fois on rendu la coposant de calculer en nouveau le nombre de chaptire,
    //mais il refaire le calcule si le cours est change (donc en fait le calcule au debut de chaque generation de cours) ou si on change le cours
    const totalChaptersCount=React.useMemo(()=>{
        return course.units.reduce((acc,unit)=>{
            return acc+unit.chapters.length
        },0)
    },[course.units])
  return (
    <div className='w-full mt-4'>
        {course.units.map((unit,unitIndex)=>{
            return (
                <div key={unit.id} className='mt-5'>
                    <h2 className='text-sm uppercase text-secondary-foreground/60'>
                        unit {unitIndex+1}
                    </h2>
                    <h3 className='text-2xl font-bold'>{unit.name}</h3>
                    <div className='mt-3'>
                        {unit.chapters.map((chapter,chapterIndex)=>{
                            return(
                                <CHpaterCard ref={chapterRef[chapter.id]} key={chapter.id} chapter={chapter} chapterIndex={chapterIndex} />
                            )
                        })}
                    </div>
                </div>
            )
        })}
        <div className='flex items-center justify-center mt-4'>
            <Separator className='flex-1 bg-indigo-300 dark:bg-secondary'/>
            <div className='flex items-center mx-4'>
                <Link href={"/create"} className={buttonVariants({variant:'secondary'})}>
                    <ChevronLeftCircleIcon className='w-4 h-4 mr-2' strokeWidth={4}/>
                    Back
                </Link>
                <Button onClick={()=>{
                    Object.values(chapterRef).forEach((ref)=>{
                        ref.current?.triggerLoad()
                    })
                }} type='button' className='ml-4 font-semibold bg-indigo-300 text-black dark:bg-secondary dark:text-white'>
                    <ChevronRightCircle className='w-4 h-4 mr-2' strokeWidth={4}/>
                    Generate
                </Button>
            </div>
            <Separator className='flex-1'/>
        </div>
    </div>
  )
}

export default ConfirmeChapter