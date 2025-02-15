"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

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

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}?type=categories`);
    const res = await response.json();
    setCategories(res?.filter((cate) => cate?.display !== "subcategories"));
    setAllCategories(res);
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Events - FurniSure";
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="event-page">
      <Head>
        <title>Events - Furnisure</title>
        <meta
          name="description"
          content="Explore the categories and products in our event!"
        />
      </Head>
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
