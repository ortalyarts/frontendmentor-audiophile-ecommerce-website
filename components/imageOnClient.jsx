'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageOnClient({srcDesktop, srcTablet, srcMobile, alt}) {
    const [img, setImg] = useState({src: srcDesktop, width: 540, height: 560});
    const handleSwitchImage = () => {
        if (window.innerWidth >= 768) {
            setImg({src: srcDesktop, width: 540, height: 560})
        } else if (window.innerWidth >= 376) {
            setImg({src: srcTablet, width: 689, height: 352})
        } else {
            setImg({src: srcMobile, width: 327, height: 352})
        }
    }
      useEffect(() => {
          window.addEventListener("resize", handleSwitchImage);
          return () => {
              window.removeEventListener("resize", handleSwitchImage)
          }
          
      }, [])
    return(
        <Image
            src={img.src.replace('./', '/').replace('image-product', 'image-category-page-preview')}
            alt={alt}
            width={img.width} height={img.height}
            className="rounded-corners" />
    )
}