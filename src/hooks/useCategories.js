  import { useState, useEffect } from "react";

  // Custom hook to fetch categories
  const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`https://furnisure.me/api/woocommerce?type=categories`);
          const data = await response.json();
          setCategories(data);
        } catch (err) {
          setError("Error fetching categories");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }, []);

    return { categories, loading, error };
  };

  export default useCategories;
