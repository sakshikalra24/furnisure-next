
"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import EventHeader from "../../components/EventHeader/EventHeader";
import EventBanner from "../../components/EventBanner/EventBanner";
import "./index.css"; 

const Event = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true)
    const productsRes = await fetch(
      "https://furnisure.me/api/woocommerce?type=categories"
    );
    const productsList = await productsRes.json();
    setCategories(
        productsList?.filter((cate) => cate?.display !== "subcategories")
      );
    setAllCategories(productsList);
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <div className="event-page">
      <EventHeader categories={allCategories} />
      <EventBanner />
      {/* {categories?.length > 0 ? (
        <CategoryGrid loading={loading} categories={categories} />
      ) : (
        "Loading"
      )}
      <ImageMasonry /> */}
      <Footer />
    </div>
  );
};

export default Event;

