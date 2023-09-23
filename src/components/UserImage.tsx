import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import {User} from 'next-auth'
import Image from 'next/image'

type Props = {
    user:User
}

function UserImage({user}: Props) {
  return (
    <Avatar>
        {user.image ? (
            <div className='relative w-full h-full aspect-auto'>
                {/* fill est utiliser si on a un image avec width et height inconnue donc il est utile de l'utiliser */}
                {/* referrerPolicy='no-referrer' est un mesur de sécurity important de ecrire pour n'est pas partagée les information avec origine de la photo */}
                <Image fill src={user.image} alt='user profile' referrerPolicy='no-referrer'/>
            </div>
        ):(
            <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
            </AvatarFallback>
        )}
    </Avatar>
  )
}

export default UserImage