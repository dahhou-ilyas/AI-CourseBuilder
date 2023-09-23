"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import {LogOut} from "lucide-react"
import UserImage from './UserImage'

type Props = {
    user:User
}

function UserAccountNav(props: Props) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserImage user={props.user}/> 
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <div className='flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-4 '>
                    {props.user?.name && (<p className='font-bold'>{props.user.name}</p>)}
                    {props.user?.email && (
                        <p className='w-[200px] truncate text-sm text-secondary-foreground'>
                            {props.user.email}
                        </p>
                    )}
                </div>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className='text-red-700 cursor-pointer' onSelect={()=>{
                    signOut();
                }}>Sign out
                <LogOut className='w-4 h-4 ml-2'/>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav