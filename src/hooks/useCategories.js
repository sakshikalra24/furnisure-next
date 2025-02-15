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
        const baseUrl = prrocess.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${baseUrl}?type=categories`);
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
