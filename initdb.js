// const Database = require("better-sqlite3");
const sql = require('better-sqlite3');
const fs = require("fs");

// Initialize database
const db = sql('products.db');
// const db = new Database("database.sqlite", { verbose: console.log });

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    slug TEXT UNIQUE,
    name TEXT,
    category TEXT,
    price INTEGER,
    description TEXT,
    features TEXT,
    new BOOLEAN
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    type TEXT,
    mobile TEXT,
    tablet TEXT,
    desktop TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS includes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER,
    item TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    type TEXT,
    mobile TEXT,
    tablet TEXT,
    desktop TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS others (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    slug TEXT,
    name TEXT,
    mobile TEXT,
    tablet TEXT,
    desktop TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

// Load JSON data
const rawData = fs.readFileSync("data.json", "utf8");
const products = JSON.parse(rawData);

// Prepare insert statements
const insertProduct = db.prepare(`
  INSERT INTO products (id, slug, name, category, price, description, features, new) 
  VALUES (@id, @slug, @name, @category, @price, @description, @features, @new)
`);

const insertImage = db.prepare(`
  INSERT INTO images (product_id, type, mobile, tablet, desktop) 
  VALUES (@product_id, @type, @mobile, @tablet, @desktop)
`);

const insertInclude = db.prepare(`
  INSERT INTO includes (product_id, quantity, item) 
  VALUES (@product_id, @quantity, @item)
`);

const insertGallery = db.prepare(`
  INSERT INTO gallery (product_id, type, mobile, tablet, desktop) 
  VALUES (@product_id, @type, @mobile, @tablet, @desktop)
`);

const insertOther = db.prepare(`
  INSERT INTO others (product_id, slug, name, mobile, tablet, desktop) 
  VALUES (@product_id, @slug, @name, @mobile, @tablet, @desktop)
`);

// Insert data
products.forEach(product => {
  insertProduct.run({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
    features: JSON.stringify(product.features), // Convert object/array to string
    new: product.new ? 1 : 0 // Convert boolean to integer (0 or 1)
  });

  // Insert images
  ["image", "categoryImage"].forEach(type => {
    const image = product[type];
    if (image) {
      insertImage.run({ product_id: product.id, type, ...image });
    }
  });

  // Insert included items
  product.includes.forEach(include => {
    insertInclude.run({ product_id: product.id, ...include });
  });

  // Insert gallery images
  ["first", "second", "third"].forEach(type => {
    const image = product.gallery[type];
    if (image) {
      insertGallery.run({ product_id: product.id, type, ...image });
    }
  });

  // Insert related products (others)
  product.others.forEach(other => {
    insertOther.run({
      product_id: product.id,
      slug: other.slug,
      name: other.name,
      ...other.image
    });
  });
});
// products.forEach(product => {
//   insertProduct.run(product);

//   // Insert images
//   ["image", "categoryImage"].forEach(type => {
//     const image = product[type];
//     if (image) {
//       insertImage.run({ product_id: product.id, type, ...image });
//     }
//   });

//   // Insert included items
//   product.includes.forEach(include => {
//     insertInclude.run({ product_id: product.id, ...include });
//   });

//   // Insert gallery images
//   ["first", "second", "third"].forEach(type => {
//     const image = product.gallery[type];
//     if (image) {
//       insertGallery.run({ product_id: product.id, type, ...image });
//     }
//   });

//   // Insert related products (others)
//   product.others.forEach(other => {
//     insertOther.run({
//       product_id: product.id,
//       slug: other.slug,
//       name: other.name,
//       ...other.image
//     });
//   });
// });

console.log("Database initialized successfully!");
db.close();