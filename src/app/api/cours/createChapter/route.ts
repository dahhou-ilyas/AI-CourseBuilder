import { NextResponse } from 'next/server'
import { createChaptersSchema } from '@/app/validation/cours'; 
import { ZodError } from 'zod';
import { strict_output } from '@/lib/gpt';
import { test } from '@/lib/test';
import { getUnsplashImage } from '@/lib/unsplash';
import { prisma } from '@/lib/db';

export async function POST(req:Request,res:Response) {
    console.log('object');
    try {
        const body=await req.json();
        const {title,units} = createChaptersSchema.parse(body);
        
        type OutputUnits={
            title:string;
            chapters:{
                youtube_search_query:string;
                chapter_title:string;
            }[]
        }[]
        

        let output_unit:OutputUnits=await strict_output(
            'You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube video for each chapter',
            units.map((elem)=>{
                return `It your job to create a course about ${title}.First give him introduction of ${title}, then the user has requested to create chapters for each of the units ${elem}. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
            }),
            {
                title:"title of the unit",
                chapters:'an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object'
            }
        )

        const imageSearchTerm=await strict_output(
            'you are an AI capable of finding the most relevant image for a course',
            `Please provide a good image search term for the title of the of a course about ${title}. This search will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
            {
                image_search_term:'a good search term for the title of the course'
            }
        );

        const course_image=await getUnsplashImage(imageSearchTerm.image_search_term);

        const course =await prisma.course.create({
            data:{
                name:title,
                image:course_image
            }
        })

        for(const unit of output_unit) {
            const title = unit.title;
            const prismaUnit=await prisma.unit.create({
                data : {
                    name:title,
                    courseId:course.id
                }
            })
            await prisma.chapter.createMany({
                data : unit.chapters.map((chap)=>{
                    return{
                       name : chap.chapter_title,
                       youtubeSearchQuery : chap.youtube_search_query,
                       unitId : prismaUnit.id
                    }
                })
            })
        }

        return NextResponse.json({cours_id:course.id})
    } catch (error) {
        if(error instanceof ZodError){
            return new NextResponse('invalide body',{status:400})
        }
    }
    
}


export async function GET(){
    console.log('eeeeeeeeeeee')
    let t:any=await test()
    console.log(t);
    console.log("object");
    return NextResponse.json(t)
}