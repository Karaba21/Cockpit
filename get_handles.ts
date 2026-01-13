
import { getAllProducts } from './src/lib/shopify';
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function main() {
  const products = await getAllProducts();
  console.log('Handles:', products.map(p => p.handle).slice(0, 5));
}
main();

