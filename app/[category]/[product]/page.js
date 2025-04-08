import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProduct, getIncludes, getGallery, getOthers } from '@/lib/util.js';

import ThumbProductCategories from "@/components/thumbProductCategories.jsx";
import GoBackButton from '@/components/goBackButton.jsx';
import Article from '@/components/article.jsx';
import QuantityAddToCart from '@/components/quantityAddToCart.jsx';

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
                <picture>
                    <source srcSet={selectedProduct.desktop.replace('./', '/')} media="(min-width: 768px)" width="540" height="560" />
                    <source srcSet={selectedProduct.tablet.replace('./', '/')} media="(min-width: 560px)" width="281" height="480" />
                    <img src={selectedProduct.mobile.replace('./', '/')} alt={selectedProduct.name} width="327" height="327" />
                </picture>
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
                    <picture className='rounded-corners'>
                        <source srcSet={productGallery[0].desktop.replace('./', '/')} media="(min-width: 768px)" width="445" height="280" />
                        <source srcSet={productGallery[0].tablet.replace('./', '/')} media="(min-width: 560px)" width="277" height="174" />
                        <img srcSet={productGallery[0].mobile.replace('./', '/')} alt={selectedProduct.name} width="327" height="327" />
                    </picture>
                    <picture className='rounded-corners'>
                        <source srcSet={productGallery[1].desktop.replace('./', '/')} media="(min-width: 768px)" width="445" height="280" />
                        <source srcSet={productGallery[1].tablet.replace('./', '/')} media="(min-width: 560px)"  width="277" height="174" />
                        <img src={productGallery[1].mobile.replace('./', '/')} alt={selectedProduct.name} width="327" height="327" />
                    </picture>
                </div>
                <picture className='rounded-corners'>
                    <source srcSet={productGallery[2].desktop.replace('./', '/')} media="(min-width: 768px)" width="635" height="592" />
                    <source srcSet={productGallery[2].tablet.replace('./', '/')} media="(min-width: 560px)" width="395" height="368" />
                    <img src={productGallery[2].mobile.replace('./', '/')} alt={selectedProduct.name} width="327" height="327" />
                </picture>
            </div>
            <div className='related-products'>
                <h2 className='title-3'>You may also like</h2>
                <ul>
                    {otherProducts.map((suggestion) => {
                        const pathDesktop = suggestion.mobile.replace('mobile', 'desktop');
                        const pathTablet = suggestion.mobile.replace('mobile', 'tablet');

                        return<li key={suggestion.slug}>

                            <picture className='rounded-corners'>
                                <source srcSet={pathDesktop.replace('./', '/')} media="(min-width: 768px)" width="350" height="318" />
                                <source srcSet={pathTablet.replace('./', '/')} media="(min-width: 560px)" width="233" height="318" />
                                <img src={suggestion.mobile.replace('./', '/')} alt={selectedProduct.name} width="327" height="120" />
                            </picture>

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