import { useState, useEffect } from "react";

// Custom hook to fetch subcategories
const useSubCategories = (categoryId) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://furnisure.me/api/woocommerce?type=categories&id=${categoryId}`
        );
        const data = await response.json();
        setSubcategories(data);
      } catch (err) {
        setError("Error fetching subcategories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  return { subcategories, loading, error };
};

export default useSubCategories;
