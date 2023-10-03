import { Chapter, Course, Unit } from 'prisma/prisma-client'
import React from 'react'
import CHpaterCard from './CHpaterCard'

type Props = {
    course:Course & {
        units:(Unit & {
            chapters:Chapter[]
        })[]
    }

}

function ConfirmeChapter({course}: Props) {
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
                                <CHpaterCard key={chapter.id} chapter={chapter} chapterIndex={chapterIndex} />
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ConfirmeChapter