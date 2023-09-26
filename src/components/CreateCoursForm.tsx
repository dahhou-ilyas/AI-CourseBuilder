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


type Props = {}

//adapter le type de z au type de typescript
type Input=z.infer<typeof createChaptersSchema>

function CreateCoursForm({}: Props) {
    const form =useForm<Input>({
        resolver:zodResolver(createChaptersSchema),
        defaultValues:{
            title:"",
            units:['','','']
        }
    })
    function onSubmit(data:Input){
        console.log(data);
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
                    <Button type='submit' size={"lg"} className='font-mono w-[50%] mt-5'>Generating</Button> 
                </div>   
            </form>
        </Form>
    </div>
  )
}

export default CreateCoursForm