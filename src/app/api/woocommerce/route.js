// src/app/api/woocommerce/route.js
import Category from '../../../utils/category';  // Path to your Category utility
import Products from '../../../utils/products'; // Path to your Products utility

export async function GET(req) {
  const url = new URL(req.url);  // Parse the URL
  const type = url.searchParams.get('type');  // Extract the 'type' query parameter

  console.log('Request type:', type);  // Debugging log

  if (type === 'categories') {
    try {
      const data = await Category.get();  // Fetch categories
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return new Response(JSON.stringify({ message: 'Error fetching categories' }), { status: 500 });
    }
  }

  if (type === 'products') {
    try {
      const data = await Products.get();  // Fetch products
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error('Error fetching products:', error);
      return new Response(JSON.stringify({ message: 'Error fetching products' }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ message: 'Invalid request type' }), { status: 400 });
}
