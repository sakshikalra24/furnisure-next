"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import About from "../components/About/About";
import Selection from "../components/Selection/Selection";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import Footer from "../components/Footer/Footer";
import "./index.css";

const Home = () => {
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState();
  const pathname = usePathname(); // Access current pathname

  const sendPageView = (url, title) => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: title,
        page_location: url,
      });
    }
  };

  const fetchCategories = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const productsRes = await fetch(`${baseUrl}?type=categories`);
    const productsList = await productsRes.json();
    setProducts(productsList);
  };

  useEffect(() => {
    fetchCategories();
    const loadingTimeout = setTimeout(() => {
      document.querySelector(`.App`).classList.add("translated");
      setLoader(false);
    }, 6000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!loader) {
      if (pathname === "/") {
        const homeElement = document.querySelector(`.Home`);
        const rootElement = document.querySelector("#root");
        const viewportHeight = window.innerHeight;
        if (homeElement && rootElement) {
          rootElement.style.height = `200vh`;
        }
      }
    }

    return () => {
      const rootElement = document.querySelector("#root");
      if (rootElement) {
        rootElement.style.height = "";
        rootElement.style.overflow = "";
      }
    };
  }, [loader, pathname, isClient]);

  return (
    <div className="App">
      <Loader />
      <div className="Home">
        <Header />
        <div className="content">
          <Banner />
          <Selection />
          <About />
          <ProductSlider product={products} name="Featured Products" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
