import Category from "../../../utils/category"; // Adjust path as necessary
import Products from "../../../utils/products"; // Adjust path as necessary

export async function GET(req) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");

  // Handling category fetch
  if (type === "categories") {
    if (id && page && size) {
      try {
        const response = await Category.getSubcategory(id, page, size);
        const totalProducts = response.headers["x-wp-total"];
        const data = response.data;
        const responseBody = {
          data: [...data],
          total: totalProducts,
        };
        return new Response(JSON.stringify(responseBody), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        return new Response(
          JSON.stringify({ message: "Error fetching subcategories" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      try {
        const data = await Category.get();
        return new Response(JSON.stringify(data.data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
        return new Response(
          JSON.stringify({ message: "Error fetching categories" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  // Handling product fetch
  if (type === "products") {
    if (id) {
      try {
        const data = await Products.getByID(id);
        return new Response(JSON.stringify(data.data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        return new Response(
          JSON.stringify({ message: "Error fetching product by ID" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      try {
        const data = await Products.get();
        return new Response(JSON.stringify(data.data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(
          JSON.stringify({ message: "Error fetching products" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  // Default return for invalid 'type' query
  return new Response(JSON.stringify({ message: "Invalid request type" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
