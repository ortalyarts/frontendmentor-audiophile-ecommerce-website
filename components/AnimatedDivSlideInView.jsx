"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedDivSlideInView({ children, ...props }) {

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true); // Ensures animations only run on the client
    }, []);

    if (!isClient) {
        return null; // Prevent rendering on the server
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 200,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
// "use client";

// import { motion, useAnimation, useInView } from "framer-motion";
// import { useEffect, useRef } from "react";

// export default function AnimatedDivSlideUpInView({ children, ...props }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, {
//     threshold: 0.2,
//     // triggerOnce: true,
//   });

//   const controls = useAnimation();

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.3, ease: "easeOut" },
//       });
//     }
//   }, [inView, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 200 }}
//       animate={controls}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// }

// "use client"

// import { motion } from "framer-motion"

// export default function AnimatedDivSlideUpInView ({children, ...props}){
//     console.log('I work!')
//     return(

//     <motion.div 
//     initial={{
//         opacity:0,
//     }}
//     whileInView={{
//         opacity: 1,
//     }}
//         {...props}
//         >
//         {children}
//     </motion.div>


//     )
// }

// import { motion } from "framer-motion"

// export default function AnimatedDivSlideUpInView ({children, ...props}){

//     return(

//     <motion.div 
//           initial={{
//               opacity:0,
//               y: 200
//           }}
//           whileInView={{
//               opacity: 1,
//               y: 0
//           }}
//           viewport={{
//             //   margin: '-100px',
//             once: true, amount: 0.2 
//           }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//         {...props}
//         >
//         {children}
//     </motion.div>


//     )
// }