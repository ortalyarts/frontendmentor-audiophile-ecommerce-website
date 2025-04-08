// import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getProducts } from '@/lib/util.js';

import ThumbProductCategories from "@/components/thumbProductCategories";
import Article from "@/components/article";
import ProductListItem from "@/components/productListItem";

const VALID_CATEGORIES = ['headphones', 'speakers', 'earphones'];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }));
}

export const dynamicParams = false; // Optional: disables fallback mode

export default async function Category({ params }) {
  const selectedCategory = params.category;

  if (!VALID_CATEGORIES.includes(selectedCategory)) {
    notFound();
  }

  const products = getProducts(); // if this is sync, no need to await
  const productsOfCategory = products.filter(item => item.category === selectedCategory);

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
              return <ProductListItem key={item.slug} item={item} itemImages={itemImages} />
            })}
          </div>
        </Suspense>
        <ThumbProductCategories />
        <Article />
      </div>
    </>
  );
}