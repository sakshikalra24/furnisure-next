// next-sitemap.js

import fetch from 'node-fetch';  // If you're using node-fetch to make API requests
import { promises as fs } from 'fs'; // If you're working with file system
import path from 'path'; // To manage paths

const siteUrl = 'https://furnisure.me/'; // Replace with your production URL

async function fetchCategories() {
  const res = await fetch('https://furnisure.me//api/woocommerce?type=categories');
  const categories = await res.json();
  return categories;
}

async function fetchProducts() {
  const res = await fetch('https://furnisure.me//api/woocommerce?type=products');
  const products = await res.json();
  return products;
}

export default {
  siteUrl,
  generateRobotsTxt: true, // Generates robots.txt as well
  exclude: ['/404', '/500'], // Exclude error pages from sitemap
  additionalPaths: async () => {
    const paths = [];
    
    // Fetch dynamic pages
    const categories = await fetchCategories();
    const products = await fetchProducts();

    // Generate category page paths
    categories.forEach((category) => {
      paths.push({
        loc: `/category/${category.id}`,
        lastmod: new Date().toISOString(),
      });
    });

    // Generate product page paths
    products.forEach((product) => {
      paths.push({
        loc: `/product/${product.id}`,
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },
};
