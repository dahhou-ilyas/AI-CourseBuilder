"use client"

import React from 'react'
import { Form,FormControl,FormField, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { createChaptersSchema } from '@/app/validation/cours'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from './ui/input'

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
                    return (<FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                        <FormLabel className='flex-1 text-xl'>
                            Title
                        </FormLabel>
                        <FormControl className='flex-[6]'>
                            <Input placeholder='Enter the main topic of the cours' className='bg-indigo-300 border-none dark:bg-black' {...field}/>
                        </FormControl>
                    </FormItem>)
                }}
                />

            </form>
            {form.watch("units").map((_,index)=>{
                return (
                    <FormField control={form.control} name={`units.${index}`}
                        render={({field})=>{
                            return (
                                <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                                    <FormLabel className='flex-1 text-xl'>
                                        Unit {index+1}
                                    </FormLabel>
                                    <FormControl className='flex-[6]'>
                                        <Input placeholder='Enter the main topic of the cours' className='bg-indigo-300 border-none dark:bg-black' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />
                )
            })}
        </Form>
    </div>
  )
}

export default CreateCoursForm