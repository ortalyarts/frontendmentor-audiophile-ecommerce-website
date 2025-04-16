import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProduct, getIncludes, getGallery, getOthers } from '@/lib/util.js';

import ThumbProductCategories from "@/components/thumbProductCategories.jsx";
import GoBackButton from '@/components/goBackButton.jsx';
import Article from '@/components/article.jsx';
import QuantityAddToCart from '@/components/quantityAddToCart.jsx';
import ImageProductDetails from '@/components/imageProductDetails';

export default async function ProductDetails(props) {
    const params = await props.params;
    const selectedProduct = await getProduct(params.product);
    //for not existing pages, intead of throwing an error
    if (!selectedProduct) {
        notFound();
        }
    const [productIncludes, productGallery, otherProducts] = await Promise.all([
        getIncludes(selectedProduct.id),
        getGallery(selectedProduct.id),
        getOthers(selectedProduct.id)
    ]);

    return (
        <div className="content-holder product-details-page">
            <GoBackButton />
            <Suspense fallback={<p>Loading products...</p>}>
            <article className='product-details-top'>
            <div className='image-holder rounded-corners'>
                <ImageProductDetails srcDesktop={selectedProduct.desktop} srcTablet={selectedProduct.tablet} srcMobile={selectedProduct.mobile} alt={selectedProduct.name}
                    desktopWidth={540} desktopHeight={560}
                    tabletWidth={281} tabletHeight={480}
                    mobileWidth={327} mobileHeight={327}
                />
            </div>
            <div className='short-summary'>
                {selectedProduct.new === 1 && <p className='title-overline'>New product</p>}
                <h1 className='title-2'>{selectedProduct.name}</h1>
                <p>{selectedProduct.description}</p>
                <p className='price title-6'>$ {selectedProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <QuantityAddToCart slug={selectedProduct.slug} price={selectedProduct.price} name={selectedProduct.name}/>                
            </div>
            </article>
            <article className='features-and-contains'>
                <div>
                    <h3 className='title-3'>Features</h3>
                    <p>{selectedProduct.features}</p>
                </div>
                <div className='contains-holder'>
                    <h3 className='title-3'>In the box</h3>
                    <ul className='contains'>
                        {productIncludes.map((inc, index) => 
                            <li key={`${selectedProduct.slug}-${index}`}>
                                <span className='include-quantity'>{inc.quantity}x</span>
                                {inc.item}
                            </li>
                        )}
                    </ul>
                </div>
            </article>
            <div className='gallery'>
                <div className='gallery-left'>
                    <ImageProductDetails srcDesktop={productGallery[0].desktop} srcTablet={productGallery[0].tablet} srcMobile={productGallery[0].mobile} alt={selectedProduct.name}
                        desktopWidth={445} desktopHeight={280}
                        tabletWidth={277} tabletHeight={174}
                        mobileWidth={327} mobileHeight={327}
                    />
                    <ImageProductDetails srcDesktop={productGallery[1].desktop} srcTablet={productGallery[1].tablet} srcMobile={productGallery[1].mobile} alt={selectedProduct.name}
                        desktopWidth={445} desktopHeight={280}
                        tabletWidth={277} tabletHeight={174}
                        mobileWidth={327} mobileHeight={327}
                    />
                </div>
                <ImageProductDetails srcDesktop={productGallery[2].desktop} srcTablet={productGallery[2].tablet} srcMobile={productGallery[2].mobile} alt={selectedProduct.name}
                    desktopWidth={635} desktopHeight={592}
                    tabletWidth={395} tabletHeight={368}
                    mobileWidth={327} mobileHeight={327}
                />
            </div>
            <div className='related-products'>
                <h2 className='title-3'>You may also like</h2>
                <ul>
                    {otherProducts.map((suggestion) => {
                        const pathDesktop = suggestion.mobile.replace('mobile', 'desktop');
                        const pathTablet = suggestion.mobile.replace('mobile', 'tablet');

                        return<li key={suggestion.slug}>
                            <ImageProductDetails srcDesktop={pathDesktop} srcTablet={pathTablet} srcMobile={suggestion.mobile} alt={suggestion.name}
                                desktopWidth={350} desktopHeight={318}
                                tabletWidth={233} tabletHeight={318}
                                mobileWidth={327} mobileHeight={120}
                            />
                            <h3 className='title-5'>{suggestion.name}</h3>
                            <Link href={`/products/${suggestion.slug}`} className="btn-main">See product</Link>
                            
                        </li>
                    })}
                </ul>
            </div>
            </Suspense>
            <ThumbProductCategories />
            <Article />
        </div>
    );
}