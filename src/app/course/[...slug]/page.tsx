import CourseSideBare from '@/components/CourseSideBare';
import MainVideoSummary from '@/components/MainVideoSummary';
import QuizCards from '@/components/QuizCards';
import { prisma } from '@/lib/db';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params:{
        slug:string[]
    }
}

async function CoursePage({params:{slug}}: Props) {
    const [courseId,unitIndexParam,chapterIndexParams]=slug;
    const coure=await prisma.course.findUnique({
        where:{id:courseId},
        include:{
            units:{
                include:{
                    chapters:{
                        include:{questions:true}
                    }
                }
            }
        }
    })
    if(!coure){
        return redirect('/gallery');
    }
    let unitIndex=parseInt(unitIndexParam);
    let chapterIndex=parseInt(chapterIndexParams);

    const unit=coure.units[unitIndex];

    if(!unit){
        return redirect('/gallery');
    }

    const chapter=unit.chapters[chapterIndex];

    if(!chapter){
        return redirect('/gallery');
    }

    const nextChapter=unit.chapters[chapterIndex+1];
    const prevChapter=unit.chapters[chapterIndex-1]

  return (
    <div>
        <CourseSideBare course={coure} currentChapterId={chapter.id}/>
        <div>
            <div className='sm:ml-[400px] px-8'>
                <div className='flex'>
                    <MainVideoSummary chapter={chapter} unit={unit} unitIndex={unitIndex} chapterIndex={chapterIndex}/>
                    <QuizCards chapter={chapter}/>
                </div>
                <div className='flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500'/>
                <div className='flex pb-8'>
                    {
                        prevChapter && (
                            <Link className='flex mt-4 mr-auto w-fit' href={`/course/${coure.id}/${unitIndex}/${chapterIndex-1}`}>
                                <div className='flex items-center'>
                                    <ChevronLeftCircle className='w-6 h-6 mr-1'/>
                                    <div className='flex flex-col items-start'>
                                        <span className='text-sm text-secondary-foreground/60'>Previous Chapter</span>
                                        <span className='text-xl font-bold'>{prevChapter.name}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                    {
                        nextChapter && (
                            <Link className='flex mt-4 mr-auto w-fit' href={`/course/${coure.id}/${unitIndex}/${chapterIndex+1}`}>
                                <div className='flex items-center'>
                                    <div className='flex flex-col items-start'>
                                        <span className='text-sm text-secondary-foreground/60'>Next Chapter</span>
                                        <span className='text-xl font-bold'>{nextChapter.name}</span>
                                    </div>
                                    <ChevronRightCircle className='w-6 h-6 mr-1'/>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default CoursePage