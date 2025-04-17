
import { getCategoriesWithProducts } from '@/lib/util.js';

export async function generateStaticParams() {
    const categoriesWithProducts = await getCategoriesWithProducts();
  
    const params = [];
    categoriesWithProducts.forEach(({ category, products }) => {
      products.forEach(product => {
        params.push({
          category,
          product: product.slug,
        });
      });
    });
    console.log('Generated static params:', params); // Debugging output
    return params;
  }
export default async function ProductDetails(props) {
    (async () => {
        generateStaticParams()
      })();
 
    return (
    <h1>Test page</h1>
    )
}