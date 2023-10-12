import CourseSideBare from '@/components/CourseSideBare';
import { prisma } from '@/lib/db';
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
                    chapters:true
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

  return (

    <CourseSideBare course={coure} currentChapterId={chapter.id}/>
  )
}

export default CoursePage