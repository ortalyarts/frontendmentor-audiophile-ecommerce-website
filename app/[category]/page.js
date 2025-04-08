import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getProducts } from '@/lib/util.js';

import ThumbProductCategories from "@/components/thumbProductCategories";
import Article from "@/components/article";

import ProductListItem from "@/components/productListItem";

const VALID_CATEGORIES = ['headphones', 'speakers', 'earphones'];

export default async function Category(props) {
  const products = getProducts();
  const params = await props.params;

  const selectedCategory = await params.category;
  if (!VALID_CATEGORIES.includes(selectedCategory)) {
    notFound(); // triggers Next.js's 404 page
  }
  const productsOfCategory = products.filter(item => item.category == selectedCategory);

  return (
    <>
    <div className='category-name'>
      <h1 className='title-3'>{selectedCategory}</h1>
    </div>
    <div className="content-holder">
    <Suspense fallback={<p>Loading products...</p>}>
      <div className="list-of-products">
        {productsOfCategory.map((item) => {
          const itemImages = productsOfCategory.filter(set => set.product_id === item.id);
          return <ProductListItem key={item.slug} item={item} itemImages={itemImages}/>
        })}

      </div>
    </Suspense>

    <ThumbProductCategories />
    <Article />
  </div>
  </>
  );
}
