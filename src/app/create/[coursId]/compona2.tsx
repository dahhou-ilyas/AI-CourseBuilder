"use client"
import { motion } from 'framer-motion'
import { InfoIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function InfoCours({}: Props) {
    const [over,setOver]=useState<boolean>(false)

    function ovr(){
        setOver(true)
    }
    function out(){
        setOver(false)
    }

    const containerVariants = {
      hidden: { opacity: 1, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
  
    const textVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  return (
    <motion.div
      initial="hidden"
      animate={over ? 'visible' : 'hidden'}
      exit="hidden"
      variants={containerVariants}
      onMouseOver={ovr}
      onMouseOut={out}
      className={
        over
          ? 'flex p-1 mb-4 mt-4 border-none bg-white/10 rounded-lg'
          : 'flex p-1 mb-4 border-none bg-white/10 rounded-lg m-auto'
      }
    >
      <InfoIcon className={over ? 'w-12 mr-3 relative h-12 text-neutral-800 dark:text-gray-200':'w-12 h-12 text-neutral-800 dark:text-gray-200'} />
      <motion.p
        hidden={!over}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
         We've created a chapter for each of your units. Please review them, and once you're satisfied, click the button to confirm and proceed.
      </motion.p>
    </motion.div>
  )
}


export default InfoCours