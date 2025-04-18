
import sql from 'better-sqlite3'; // database

const db = sql('products.db');
//const db = sql(`${process.cwd()}/products.db`);
//console.log('Database path:', `${process.cwd()}/products.db`);

// Getting all the products

export function getProducts() {
  return db.prepare('SELECT prod.*,img.mobile, img.tablet, img.desktop FROM products AS prod INNER JOIN images AS img ON prod.id = img.product_id WHERE img.type = \'image\'').all();
}

// Getting selected meal for Meal details page

// DON'T!!! It is importent, when trying to get data by dynamic value (like the slug of the meal)
// not to set request like this: return db.prepare('SELECT * FROM meals WHERE slug = ' + slug);
// because it opens the server to SQL injection.
// The CORRECT way:

export function getProduct(slug) {
  if (!slug) return null; // Prevent errors if slug is missing
  return db.prepare('SELECT prod.*, img.mobile, img.tablet, img.desktop FROM products AS prod INNER JOIN images AS img ON prod.id = img.product_id WHERE prod.slug = ? AND img.type = \'image\'').get(slug);
}

export function getIncludes(id) {
  if (!id) return null; // Prevent errors if slug is missing
  return db.prepare('SELECT * FROM includes WHERE product_id = ?').all(id);
}

export function getGallery(id) {
  if (!id) return null; // Prevent errors if slug is missing
  return db.prepare('SELECT * FROM gallery WHERE product_id = ?').all(id);
}

export function getOthers(id) {
  if (!id) return null; // Prevent errors if slug is missing
  return db.prepare('SELECT * FROM others WHERE product_id = ?').all(id);
}

// Generate static params for the [category]/[product] pages (used in [product]page.js)
// Fetch all categories with their products
export async function getCategoriesWithProducts() {
  try {
      const products = await db.prepare('SELECT * FROM products').all();

      // Group products by category
      const categories = {};
      products.forEach(product => {
          if (!categories[product.category]) {
              categories[product.category] = [];
          }
          categories[product.category].push(product);
      });

      // Convert the grouped categories into an array
      return Object.entries(categories).map(([category, products]) => ({
          category,
          products,
      }));
  } catch (error) {
      console.error('Error fetching categories with products:', error);
      return [];
  }
}