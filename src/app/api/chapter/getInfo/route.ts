import { NextResponse } from "next/server"
import { z } from "zod"


const bodyParser=z.object({
    chapterId:z.string()
})

export async function POST(req:Response,res:Response){
    try {
        const body=await req.json()
        const {chapterId}=bodyParser.parse(body)
        
        return NextResponse.json({message:'hello'})
    } catch (error) {
        if(error instanceof z.ZodError){
            return NextResponse.json({
              success:false, error:"Invalid body"
            },{status:400})
        }else{
            NextResponse.json({
                success:false, error:"unkown"
            },{status:500})
        }
    }
}