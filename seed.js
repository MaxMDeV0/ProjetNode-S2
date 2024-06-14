import Product from "./model/product.js";
import products from './data/products.js';

(async function seed() {
  await Product.deleteMany({});
  await Product.insertMany(products)
  console.log("Seed inserted")
  process.exit(0);
})()