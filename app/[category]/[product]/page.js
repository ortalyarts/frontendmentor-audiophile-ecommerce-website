
import { getCategoriesWithProducts } from '@/lib/util.js';

export async function generateStaticParams() {
    const categoriesWithProducts = await getCategoriesWithProducts();
  
    // Flatten the structure into an array of { category, product } objects
    const params = categoriesWithProducts.flatMap(({ category, products }) =>
        products.map(product => ({
            category,
            product: product.slug,
        }))
    );
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