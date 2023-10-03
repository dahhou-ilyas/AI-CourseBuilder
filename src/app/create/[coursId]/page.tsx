import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Info } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import InfoCours from './compona2';
import ConfirmeChapter from '@/components/ConfirmeChapter';

type Props = {
  params:{
    coursId:string;
  }
}

async function CreateChapters({params:{coursId}}: Props) {
  const session=await getAuthSession();
  if(!session?.user){
    return redirect('/gallery')
  }

  //la methode pour fair join
  const cours=await prisma.course.findUnique({
    where:{
      id:coursId
    },
    include:{
      units:{
        include:{
          chapters:true
        }
      }
    }
  })
  if(!cours){
    return redirect('/create')
  }

  return (
    <div className='flex flex-col items-start max-w-xl mx-auto my-16'> 
      <h5 className='text-sm uppercase text-secondary-foreground/60'>
        Course Name
      </h5>
      <h1 className='text-5xl font-bold'>
        {cours.name}
      </h1>
      <div className='flex mt-1 border-none '>
        <InfoCours/>
      </div>
      <ConfirmeChapter course={cours} />
    </div>
  )
}

export default CreateChapters