import { Chapter, Course, Unit } from 'prisma/prisma-client'
import React from 'react'

type Props = {
    course:Course&{
        units:(Unit & {
            chapters:Chapter[]
        })[]
    }
}

const GalleryCoursCard = ({course}: Props) => {

  return (
    <div>GalleryCoursCard</div>
  )
}

export default GalleryCoursCard