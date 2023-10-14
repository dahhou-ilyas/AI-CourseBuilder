import Image from 'next/image'
import Link from 'next/link'
import { Chapter, Course, Unit } from 'prisma/prisma-client'
import React from 'react'

type Props = {
    course:Course&{
        units:(Unit & {
            chapters:Chapter[]
        })[]
    }
}

const GalleryCoursCard =async ({course}: Props) => {

  return (
    <>
        <div className='border-none rounded-lg border-secondary'>
            <div className='relative py-2'>
                <Link href={`/course/${course.id}/0/0`} className='relative block w-fit'>
                    <Image src={course.image || ''} className='object-cover w-full max-h-[300px] rounded-lg' width={300} height={300} alt="course image"/>
                    <span className='absolute px-2 py-1 text-white bottom-0 rounded-md'>{course.name}</span>
                </Link>
            </div>
            <div className='p-4'>
                <h4 className='text-sm text-secondary-foreground/60'>Units</h4>
                <div className='space-y-1'>
                    {
                        course.units.map((unit,unitIndex)=>{
                            return(
                                <Link href={`/course/${course.id}/${unitIndex}/0`} key={unit.id} className='block underline w-fit'>
                                    Unit {unitIndex+1}: {unit.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default GalleryCoursCard