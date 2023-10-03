import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

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
    
    </div>
  )
}

export default CreateChapters