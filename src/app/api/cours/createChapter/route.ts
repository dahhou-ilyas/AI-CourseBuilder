import { NextResponse } from 'next/server'
import { createChaptersSchema } from '@/app/validation/cours'; 
import { ZodError } from 'zod';
import { strict_output } from '@/lib/gpt';
import { test } from '@/lib/test';

export async function POST(req:Request,res:Response) {
    console.log('object');
    try {
        const body=await req.json();
        const {title,units} = createChaptersSchema.parse(body);
        
        type outputUnits={
            title:string;
            chapters:{
                youtube_search_query:string;
                chapter_titlz:string;
            }[]
        }
        

        let output_unit:outputUnits=await strict_output(
            'You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube video for each chapter',
            new Array(units.length).fill(
                `It your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
            ),
            {
                title:"title of the unit",
                chapters:'an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object'
            }
        )
        console.log(title);

        console.log(output_unit);

        return NextResponse.json(output_unit)
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