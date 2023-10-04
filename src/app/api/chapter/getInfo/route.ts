import { NextResponse } from "next/server"


const sleep=async ()=>new Promise((resole)=>{
    setTimeout(resole, Math.random() * 3000)
}) 
export async function POST(req:Response,res:Response){
    try {
        await sleep()
        return NextResponse.json({message:'hello'})
    } catch (error) {
        
    }
}