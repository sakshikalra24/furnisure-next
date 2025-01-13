import makeRequest from "./woocommerce";

const Products = {
  get: () => {
    return makeRequest("/products");
  },
  getByID: (id) => {
    return makeRequest(`/products/${id}`);
  },
  post: (productData) => {
    return makeRequest("/products", "POST", productData);
  },
  update: (id, productData) => {
    return makeRequest(`/products/${id}`, "PUT", productData);
  },
  delete: (id) => {
    return makeRequest(`/products/${id}`, "DELETE");
  },
};

export default Products;
