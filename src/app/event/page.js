
"use client";

import { useEffect, useState } from "react";

import EventHeader from "../../components/EventHeader/EventHeader";
import EventBanner from "../../components/EventBanner/EventBanner";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import ImageMasonry from "../../components/ImageMasonry/ImageMasonry";
import Footer from "../../components/Footer/Footer";

import "./index.css"; 

const Event = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true)
    const response = await fetch(
      "https://furnisure.me/api/woocommerce?type=categories"
    );
    const res = await response.json();
    setCategories(
      res?.filter((cate) => cate?.display !== "subcategories")
      );
    setAllCategories(res);
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <div className="event-page">
      <EventHeader categories={allCategories} />
      <EventBanner />
      {categories?.length > 0 ? (
        <CategoryGrid loading={loading} categories={categories} />
      ) : (
        "Loading"
      )}
      <ImageMasonry />
      <Footer />
    </div>
  );
};

export default Event;

