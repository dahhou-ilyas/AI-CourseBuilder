"use client"
import { motion } from 'framer-motion'
import { InfoIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function Info({}: Props) {
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
        Tell us what course you're interested in or what you want to learn. Next,
        pick the specific topics or units you'd like to delve into. The AI will
        then put together a personalized course just for you
      </motion.p>
    </motion.div>
  );

}

export default Info