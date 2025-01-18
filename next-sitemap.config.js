// next-sitemap.js

import fetch from 'node-fetch';  // For making API requests
import { promises as fs } from 'fs'; // For file system operations
import path from 'path'; // For managing paths

const siteUrl = 'https://furnisure.me/'; // Replace with your production URL

// Fetch categories (main and subcategories)
async function fetchCategories() {
  const res = await fetch('https://furnisure.me/api/woocommerce?type=categories');
  const categories = await res.json();
  return categories;
}

// Fetch products
async function fetchProducts() {
  const res = await fetch('https://furnisure.me/api/woocommerce?type=products');
  const products = await res.json();
  return products;
}

// Fetch static assets in the public folder
async function fetchStaticAssets() {
  const publicDir = path.join(process.cwd(), 'public');
  const assetPaths = [];
  
  // Recursively read the public directory
  const getFiles = async (dir) => {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await getFiles(fullPath); // Recursively go deeper into directories
      } else {
        // Only include files that are not hidden (files starting with a dot)
        if (!file.name.startsWith('.')) {
          const relativePath = fullPath.replace(publicDir, '').replace(/\\/g, '/'); // Normalize path
          assetPaths.push(`${siteUrl}${relativePath}`);
        }
      }
    }
  };

  await getFiles(publicDir);
  return assetPaths;
}

// Generate category page URLs, including subcategories and main categories
async function generateCategoryPaths(categories, parentName = '') {
  const paths = [];
  
  for (const category of categories) {
    const categoryName = encodeURIComponent(category.name.toLowerCase().replace(/%20/g, "_"));
    
    // If category has a parent, use the parentName as part of the URL
    const fullCategoryPath = parentName ? `${parentName}/${categoryName}` : categoryName;

    // Add the category URL
    paths.push({
      loc: `/${fullCategoryPath}/${category.id}`,
      lastmod: new Date().toISOString(),
    });

    // If the category has subcategories, recursively add them
    if (category.subcategories && category.subcategories.length > 0) {
      const subcategoryPaths = await generateCategoryPaths(category.subcategories, fullCategoryPath);
      paths.push(...subcategoryPaths);
    }
  }

  return paths;
}

export default {
  siteUrl,
  generateRobotsTxt: true, // Generate robots.txt as well
  exclude: ['/404', '/500'], // Exclude error pages from sitemap
  additionalPaths: async () => {
    const paths = [];
    
    // Fetch categories and products
    const categories = await fetchCategories();
    const products = await fetchProducts();
    const staticAssets = await fetchStaticAssets(); // Fetch static assets

    // Generate category page paths (handling subcategories)
    const categoryPaths = await generateCategoryPaths(categories);
    paths.push(...categoryPaths);

    // Generate product page paths
    products.forEach((product) => {
      paths.push({
        loc: `/product/${product.id}`,
        lastmod: new Date().toISOString(),
      });
    });

    // Add paths for static assets like images, stylesheets, etc.
    staticAssets.forEach((asset) => {
      paths.push({
        loc: asset,
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },
};
