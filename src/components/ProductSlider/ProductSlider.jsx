// components/ProductSlider.js

"use client"; // Ensure this file is a client-side component

import React from "react";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import "./ProductSlider.scss";
import loader1 from "../../../public/assets/loader/loader1.webp";
import loader2 from "../../../public/assets/loader/loader2.webp";
import loader3 from "../../../public/assets/loader/loader3.webp";
import loader4 from "../../../public/assets/loader/loader4.webp";
import loader5 from "../../../public/assets/loader/loader5.webp";

const loaderImages = [loader1, loader2, loader3, loader4, loader5];

const categories = [
  "chairs",
  "majlis",
  "coffee tables",
  "tables",
  "sofa",
  "outdoor",
];

const ProductSlider = ({ product, sell = false, products, name }) => {
  const router = useRouter();

  console.log(product);

  const filteredProducts = sell
    ? products
    : product?.filter((prod) =>
        categories?.some((category) => prod?.slug?.toLowerCase() === category)
      );

  const handleClick = (prod) => {
    if (sell) {
      router.push(`/product/${prod?.id}`); // Navigate to product detail page
      window.location.reload(); // This is specific behavior in your original code, use cautiously
    } else {
      router.push(`/category/${prod?.id}`, {
        state: { name: prod?.name },
      }); // Navigate to category page
    }
  };

  console.log(filteredProducts);

  return (
    <div className="parent-product">
      <h1 className="heading">{name ? name : "Top Categories"}</h1>
      <div className={sell ? "scaleCarousel" : "carousel"}>
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((prod, index) => (
            <div
              className="main-slider"
              key={index}
              onClick={() => handleClick(prod)}
            >
              <div className="backgorund-overlay"></div>
              <img
                src={loaderImages[index % loaderImages.length].src}
                alt={prod?.name}
              />
              <div className="slider-des">
                <p>{prod?.name}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No products available in this category.</div>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
