
// import { getCategoriesWithProducts } from '@/lib/util.js';

// export async function generateStaticParams() {
//     const categoriesWithProducts = await getCategoriesWithProducts();
  
//     // Flatten the structure into an array of { category, product } objects
//     const params = categoriesWithProducts.flatMap(({ category, products }) =>
//         products.map(product => ({
//             category,
//             product: product.slug,
//         }))
//     );
//     console.log('Generated static params:', params); // Debugging output
//     return params;
//   }
import { getProducts } from '@/lib/util.js';

export async function generateStaticParams() {
    return [
        { category: 'earphones', product: 'yx1-earphones' },
        { category: 'headphones', product: 'xx59-headphones' },
        { category: 'headphones', product: 'xx99-mark-one-headphones' },
        { category: 'headphones', product: 'xx99-mark-two-headphones' },
        { category: 'speakers', product: 'zx7-speaker' },
        { category: 'speakers', product: 'zx9-speaker' },
    ];
}

export default async function ProductDetails(props) {
 
    return (
    <h1>Test page</h1>
    )
}