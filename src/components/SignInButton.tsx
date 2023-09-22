'use client'

import {signIn} from "next-auth/react"
import React from 'react'
import { Button } from './ui/button'

type Props = {}

function SignInButton({}: Props) {
  return (
    <Button variant={'secondary'} onClick={()=>{
        signIn('google')
    }}>
        Sign In
    </Button>
  )
}

export default SignInButton