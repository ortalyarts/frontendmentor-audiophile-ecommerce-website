'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageProductDetails({srcDesktop, srcTablet, srcMobile, alt,
    desktopWidth, desktopHeight,
    tabletWidth, tabletHeight,
    mobileWidth, mobileHeight
}) {
       const [img, setImg] = useState({src: srcDesktop, width: desktopWidth, height: desktopHeight});
        const handleSwitchImage = () => {
            if (window.innerWidth >= 768) {
                setImg({src: srcDesktop, width: desktopWidth, height: desktopHeight})
            } else if (window.innerWidth >= 376) {
                setImg({src: srcTablet, width: tabletWidth, height: tabletHeight})
            } else {
                setImg({src: srcMobile, width: mobileWidth, height: mobileHeight})
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
                src={img.src.replace('./', '/')}
                alt={alt}
                width={img.width} height={img.height}
                className="rounded-corners" />
        )
}