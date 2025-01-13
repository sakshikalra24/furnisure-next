  "use client"

import { useState, useEffect } from "react";

// Custom hook to fetch products
const useProductList = (subcategoryId, page = 1, productsPerPage = 12) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!subcategoryId) return;

      setLoading(true);
      setError(null);

      try {
        // API request to fetch data
        const response = await fetch(
          `https://furnisure.me/api/woocommerce?type=categories&id=${subcategoryId}&page=${page}&size=${productsPerPage}`
        );

        const data = await response.json();
        setProducts(data?.data)
        setTotalProducts(data?.total)

      } catch (err) {
        setError("Error fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategoryId, page, productsPerPage]);

  return { products, loading, error, totalProducts };
};

export default useProductList;
