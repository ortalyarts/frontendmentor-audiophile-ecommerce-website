"use client"

import { motion } from "framer-motion"

export default function AnimatedDivExpandInView ({children, ...props}){

    return(

    <motion.div 
          initial={{
              opacity:0,
              scaleX:0
          }}
          whileInView={{
              opacity: 1,
              scaleX:1
          }}
          viewport={{
            //   margin: '-100px',
            once: true, amount: 0.2 
          }}
        {...props}
        >

        {children}
    </motion.div>


    )
}