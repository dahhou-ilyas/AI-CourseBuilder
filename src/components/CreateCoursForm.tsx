"use client"

import React from 'react'
import { Form,FormControl,FormField, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { createChaptersSchema } from '@/app/validation/cours'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { PlusCircle, Trash2 } from 'lucide-react'
import {motion , AnimatePresence} from "framer-motion"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'


type Props = {}

//adapter le type de z au type de typescript
type Input=z.infer<typeof createChaptersSchema>

function CreateCoursForm({}: Props) {

    //la déffirence entre next/router est que cette package utiliser dans le next avec la version des pages et next/navigation est un nouvelle package qui utilise next 13 avec la version App

    const router=useRouter()
    const {toast}=useToast()


    const {mutate:generateChapter,isLoading}=useMutation({
        mutationFn:async ({title,units}:Input)=>{
            const res=await axios.post('/api/cours/createChapter',{title,units})
            return res.data
        }
    })

    const form =useForm<Input>({
        resolver:zodResolver(createChaptersSchema),
        defaultValues:{
            title:"",
            units:['','','']
        }
    })
    function onSubmit(data:Input){
        if(data.units.some(unit=>unit==="")){
            toast({
                title:"Error",
                description:'Please ensure that all the units are fully occupied.',
                variant:'destructive'

            })
            return
        }
        generateChapter(data,{
            onSuccess:({cours_id})=>{
                toast({
                    title:'Success',
                    description:"cours generating successfully"
                })
                router.push(`/create/${cours_id}`)
            },onError:(err)=>{
                console.log(err);
                toast({
                    title:"Error",
                    description:'Error in transfer of data',
                    variant:'destructive'
                })
            }
        })
    }
    
    
  return (
    <div className='w-full'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-4 '>
                <FormField control={form.control} name='title' 
                render={({field})=>{
                    return (<FormItem className='w-full flex flex-col justify-center items-center'>
                        <FormLabel className='text-xl font-mono'>
                            Title
                        </FormLabel>
                        <FormControl className=''>
                            <Input placeholder='Enter subtopic of the course' className='bg-indigo-300 border-none dark:bg-black' {...field}/>
                        </FormControl>
                    </FormItem>)
                }}
                />
                    <AnimatePresence>
                    {form.watch("units").map((_,index)=>{
                        return (
                            <motion.div key={index} initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{opacity:{duration:0.2},height:{duration:0.2}}}>
                                <FormField control={form.control} name={`units.${index}`}
                                render={({field})=>{
                                    return (
                                        <FormItem className='w-full flex mt-3 flex-col justify-center items-center'>
                                            <FormLabel className='text-xl font-mono'>
                                                Unit {index+1}
                                            </FormLabel>
                                            <FormControl className=''>
                                                <Input placeholder='Enter the main topic of the cours' className='bg-indigo-300 border-none dark:bg-black' {...field}/>
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <div className='flex items-center justify-center mt-6 gap-x-5 '>
                    <Button onClick={()=>form.setValue('units',[...form.watch('units'),''])} type='button' variant={"default"} className='font-semibold'>Add Unit <PlusCircle className='ml-2 text-green-700'/></Button>
                    <Button onClick={()=>form.setValue('units',form.watch('units').slice(0, -1))} type='button' variant={"default"} className='font-semibold'>Remove Unit <Trash2 className='ml-2 text-red-700'/></Button>
                </div>
                <div className='w-full flex items-center justify-center'>
                    {
                        !isLoading?
                            <Button type='submit' size={"lg"} className='font-mono w-[50%] mt-5'>
                                Generating
                            </Button>
                        :
                        <Button disabled={isLoading} type='submit' size={"lg"} className='font-mono w-[50%] mt-5 relative'>
                            Searching
                            <div role="status" className='absolute right-0' >
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-600 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                            </div>
                        </Button> 
                    }
                   
                </div>   
            </form>
        </Form>
    </div>
  )
}

export default CreateCoursForm