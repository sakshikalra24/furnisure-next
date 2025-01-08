// /app/categories/page.js
import axios from "axios";

// Server-side function to fetch categories
const fetchCategories = async () => {
  try {
    // Use absolute URL for the API route (dynamically set based on environment)
    const apiUrl = "https://furnisure.me/api/woocommerce?type=categories";

    const response = await axios.get(apiUrl);
    return response.data; // Return categories data
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; 
  }
};

const Category = async () => {
  const categories = await fetchCategories();

  return (
    <div>
      <h1>Categories</h1>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default Category;
