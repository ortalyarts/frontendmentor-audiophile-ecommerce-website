
import sql from 'better-sqlite3'; // database

const db = sql('products.db');

// Getting all the meals
// The timeout is NOT NEEDED! It is only for simulate the request time (to see the loading fallback)
// export function getProducts() {

//   return db.prepare('SELECT * FROM products').all();
// }
// export function getImages() {

//   return db.prepare('SELECT * FROM images').all();
// }
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

// export function getProduct(slug) {
//   if (!slug) return null; // Prevent errors if slug is missing
//   return db.prepare('SELECT * FROM products WHERE slug = ?').get(slug);
// }
// export function getProductImages(id) {
//   if (!id) return null; // Prevent errors if slug is missing
//   return db.prepare('SELECT * FROM images WHERE product_id = ?').all(id);
// }

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