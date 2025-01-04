// /utils/category.js
import makeRequest from './woocommerce';

const Category = {
  get: () => {
    return makeRequest("/products/categories");
  },
  getByID: (id) => {
    return makeRequest(`/products/categories/${id}`);
  },
  post: (categoryData) => {
    return makeRequest("/products/categories", "POST", categoryData);
  },
  update: (id, categoryData) => {
    return makeRequest(`/products/categories/${id}`, "PUT", categoryData);
  },
  delete: (id) => {
    return makeRequest(`/products/categories/${id}`, "DELETE");
  },
  getSubcategory: (val, page, per_page) => {
    return makeRequest(`/products?category=${val}`, 'GET', {}, page, per_page);
  },
};

export default Category;
