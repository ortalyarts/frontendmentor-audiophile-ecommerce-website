import Link from "next/link";

import AnimatedDivSlideInView from "./AnimatedDivSlideInView.jsx";

export default function ProductListItem ({item}){

    // const productImages = item.find(set => set.type === 'image');

    // const getImageSrc = (image) => {
    //     if (window.innerWidth >= 768) return image.desktop;
    //     if (window.innerWidth >= 376) return image.tablet;
    //     return image.mobile;
    //   };

    return(
    <article>
        <AnimatedDivSlideInView className="product-list-item">
        <picture>
            <source srcSet={item.desktop.replace('./', '/').replace('image-product', 'image-category-page-preview')} media="(min-width: 768px)" width="540" height="560" />
            <source srcSet={item.tablet.replace('./', '/').replace('image-product', 'image-category-page-preview')} media="(min-width: 376px)" width="689" height="352" />
            <img srcSet={item.mobile.replace('./', '/').replace('image-product', 'image-category-page-preview')} alt={item.name} width="327" height="352" />
        </picture>
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