import Link from "next/link";

import AnimatedDivSlideInView from "./AnimatedDivSlideInView.jsx";
import ImageOnClient from "./imageOnClient.jsx";

export default function ProductListItem ({item}){

    return(
    <article>
        <AnimatedDivSlideInView className="product-list-item">
            <ImageOnClient srcDesktop={item.desktop} srcTablet={item.tablet} srcMobile={item.mobile} alt={item.name}/>
        <div className="article-summary">
            <h2 className="title-2">{item.name}</h2>
            <p>
                {item.description}
            </p>
            <Link href={`/products/${item.slug}`} className="btn-main">See product</Link>
        </div> 
        </AnimatedDivSlideInView>               
    </article>
    )
}